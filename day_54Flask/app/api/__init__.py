# 生成蓝图

from flask import Blueprint
bp = Blueprint('api',__name__,url_prefix='/api')

# 写在最后是为了防止循环导入，ping.py文件也会导入 bp
from app.api import ping, users, tokens,posts,comments


