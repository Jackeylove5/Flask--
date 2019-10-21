from flask import jsonify, g
from app import db
from app.api import bp
from app.api.auth import basic_auth

@bp.route('/tokens', methods=['POST'])
@basic_auth.login_required
def get_token():
    # 登陆成功   g全局变量
    token = g.current_user.get_jwt()
    # 数据库models里面只有add
    db.session.commit()
    return jsonify({'token': token})



