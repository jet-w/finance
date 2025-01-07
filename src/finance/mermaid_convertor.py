import re
import string
from itertools import product
def generate_letter_code():
    # All lower case
    letters = string.ascii_lowercase
    # 生成序列直到满足 count 数量
    i = 1
    while True:
        # 生成长度为 i 的所有字母组合
        for combination in product(letters, repeat=i):
            yield ''.join(combination)
        i += 1

def get_lstrip(astr):
    return astr[:len(astr) - len(astr.lstrip())]

def get_split(line_string):
    # 定义正则表达式
    pattern = r"([-]{2,}>)"
    # 使用 re.findall 提取匹配的部分
    return re.findall(pattern, line_string)

def get_items(line_string):
    return list(map(lambda x: x.strip(), re.split(r"[-]{2,}>", line_string)))

def convert(content):
    # 去掉前后空行，按行拆分
    lines = content.strip().split("\n")
    #print(lines)
    code = generate_letter_code()
    code_item = {}
    rc = []
    for line in lines:
        items = get_items(line)
        for item in items:
            code_item[item] = code_item[item] if code_item.__contains__(item) else next(code)
        if len(items) == 2:
            rc.append(f"{get_lstrip(line)} {code_item[items[0]]}[{items[0]}] {get_split(line)[0]} {code_item[items[1]]}[{items[1]}]")
        else:
            rc.append(line)
    return rc

data = """
graph LR
    王东 ---> 重疾
    王东 ---> 住院报销
    王东 --> 意外
    王东 ---> 养老
    重疾 ---> 吉祥至尊两全（新华）保额10万
    重疾 ---> 健康无忧（新华）保额30万
    住院报销 ---> 康健华尊（新华）
    住院报销 ---> 吉祥至尊（新华）
    意外 ---> 安心百分百
    意外 ---> 百万任我行
"""
for i in convert(data):
    print(i)

