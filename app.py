# app.py
import os
import logging
from functools import wraps
from datetime import datetime, timedelta
import secrets

from flask import Flask, render_template, request, redirect, url_for, session, flash
from werkzeug.security import generate_password_hash, check_password_hash
from flask_wtf import CSRFProtect

app = Flask(__name__)

# ------------------------------------------------------------------------------
# 1) SECRET_KEY는 환경 변수 또는 토큰으로 관리 (원본에는 직접 토큰 생성해두었으나, 이제 환경 변수 우선)
app.secret_key = os.environ.get('FLASK_SECRET_KEY', secrets.token_hex(32))

# ------------------------------------------------------------------------------
# 2) CSRF 보호 활성화
csrf = CSRFProtect(app)

# ------------------------------------------------------------------------------
# 3) 로깅 설정 (원본에는 없던 부분 추가)
logging.basicConfig(
    filename='app.log',
    level=logging.INFO,
    format='%(asctime)s %(levelname)s %(message)s'
)

# ------------------------------------------------------------------------------
# 4) 원본 USERS 딕셔너리를, 평문 비밀번호 → 해시 비밀번호로 변경
#    (원본: 
#    USERS = {
#        'admin': {'password': 'admin123', ...},
#        'user':  {'password': 'user123', ...},
#        'sec':   {'password': 'sec2024!', ...}
#    }
#    )
USERS = {
    'admin': {
        'password_hash': generate_password_hash('admin123'),
        'access_level': 9,
        'department': '보안팀',
        'email': 'admin@yooncar.com'
    },
    'user': {
        'password_hash': generate_password_hash('user123'),
        'access_level': 3,
        'department': '개발팀',
        'email': 'user@yooncar.com'
    },
    'sec': {
        'password_hash': generate_password_hash('sec2024!'),
        'access_level': 7,
        'department': '보안팀',
        'email': 'sec@yooncar.com'
    }
}

# ------------------------------------------------------------------------------
# 5) 원본 코드에서 각 뷰 함수마다 반복되던 세션 체크 → @login_required 데코레이터로 대체
def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'username' not in session:
            flash("로그인이 필요합니다.")
            return redirect(url_for('login'))
        return f(*args, **kwargs)
    return decorated_function

# ------------------------------------------------------------------------------
# 6) 라우팅: 로그인 페이지 (원본과 동일하나, 비밀번호 검증만 해시 비교로 변경)
@app.route('/', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username', '').strip()
        password = request.form.get('password', '').strip()
        user = USERS.get(username)
        # 원본: if user and user['password'] == password:
        if user and check_password_hash(user['password_hash'], password):
            session.clear()
            session['username'] = username
            session['access_level'] = user['access_level']
            session['department'] = user['department']
            logging.info(f"User '{username}' 로그인 성공")
            return redirect(url_for('dashboard'))
        else:
            flash("로그인 정보가 올바르지 않습니다.")
            logging.warning(f"로그인 실패 시도: {username}")
    return render_template('secure_login_template.html')

# ------------------------------------------------------------------------------
# 7) 라우팅: 로그아웃 (원본과 동일, 단 데코레이터로 감쌈)
@app.route('/logout')
@login_required
def logout():
    user = session.get('username')
    session.clear()
    flash("로그아웃 되었습니다.")
    logging.info(f"User '{user}' 로그아웃")
    return redirect(url_for('login'))

# ------------------------------------------------------------------------------
# 8) 라우팅: 대시보드 (원본과 완전히 동일, 단 데코레이터 적용)
@app.route('/dashboard')
@login_required
def dashboard():
    return render_template(
        'dashboard_template.html',
        username=session['username'],
        access_level=session['access_level'],
        department=session['department']
    )

# ------------------------------------------------------------------------------
# 9) 라우팅: 운전 시뮬레이션 (원본과 동일)
@app.route('/drive_sim')
@login_required
def drive_sim():
    return render_template('drive_simulation.html')

# ------------------------------------------------------------------------------
# 10) 라우팅: 사고 발생 페이지 (원본과 동일)
@app.route('/accident')
@login_required
def accident():
    return render_template(
        'accident.html',
        time=datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    )

# ------------------------------------------------------------------------------
# 11) 라우팅: 사이버 감염 시뮬레이션 (원본과 동일)
@app.route('/cyber_infection')
@login_required
def cyber_infection():
    return render_template('cyber_infection_sim.html')

# ------------------------------------------------------------------------------
# 12) 라우팅: 강화된 로그 보기 (원본과 동일)
@app.route('/enhanced_logs')
@login_required
def enhanced_logs():
    return render_template('cyber_infection_enhanced.html')

# ------------------------------------------------------------------------------
# 13) 라우팅: 사이버 감염 완료 (원본과 동일)
@app.route('/infection_complete')
@login_required
def infection_complete():
    return render_template('cyber_infection_complete.html')

# ------------------------------------------------------------------------------
# 14) 라우팅: 데이터 복구 폼 (원본과 크게 다름 없음, 단 플래시 메시지 추가)
@app.route('/recovery', methods=['GET', 'POST'])
@login_required
def recovery():
    if request.method == 'POST':
        target = request.form.get('target', '').strip()
        if not target:
            flash("복구할 대상을 입력하세요.")
            return render_template('recovery_form.html')
        # TODO: 실제 복구 로직 구현 (원본에도 생략된 로직)
        logging.info(f"[{datetime.now()}] 복구 요청: {target} by {session['username']}")
        flash("복구 요청이 접수되었습니다.")
        return redirect(url_for('recovery_success'))
    return render_template('recovery_form.html')

# ------------------------------------------------------------------------------
# 15) 라우팅: 복구 성공 (원본과 동일)
@app.route('/recovery_success')
@login_required
def recovery_success():
    return render_template('recovery_success.html')

# ------------------------------------------------------------------------------
# 16) 라우팅: 테슬라 이스터 에그 (원본과 동일하나, 관리자 권한 체크 추가 가능)
@app.route('/tesla')
@login_required
def tesla_easteregg():
    # 원본에는 권한 체크가 없었으나, 필요하면 아래처럼 적용할 수 있음:
    # if session.get('access_level', 0) < 9:
    #     flash("권한이 없습니다.")
    #     return redirect(url_for('dashboard'))
    return render_template('tesla_easteregg_v1_5.html')

# ------------------------------------------------------------------------------
# 17) 에러 핸들러: 404 (원본과 동일)
@app.errorhandler(404)
def page_not_found(e):
    return render_template(
        'error.html',
        error_code=404,
        error_message="페이지를 찾을 수 없습니다."
    ), 404

# ------------------------------------------------------------------------------
# 18) 에러 핸들러: 500 (원본과 동일, 단 로깅 추가)
@app.errorhandler(500)
def internal_error(e):
    logging.error(f"Internal Server Error: {e}", exc_info=True)
    return render_template(
        'error.html',
        error_code=500,
        error_message="서버 내부 오류가 발생했습니다."
    ), 500

# ------------------------------------------------------------------------------
if __name__ == '__main__':
    # 원본: 템플릿/정적 폴더가 없으면 생성하는 로직이 있었으나, 실제 배포/개발 환경에선 불필요하므로 제거
    app.run(host='0.0.0.0', port=5000, debug=True)
