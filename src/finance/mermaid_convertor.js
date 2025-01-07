function* generateLetterCode() {
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    let i = 1;

    while (true) {
        const combinations = getCombinations(letters, i);
        for (const combination of combinations) {
            yield combination;
        }
        i++;
    }

    function getCombinations(chars, length) {
        if (length === 1) return chars.split('');
        const prevCombinations = getCombinations(chars, length - 1);
        const combinations = [];

        for (const char of chars) {
            for (const combination of prevCombinations) {
                combinations.push(char + combination);
            }
        }
        return combinations;
    }
}

function getLstrip(str) {
    return str.slice(0, str.length - str.trimStart().length);
}

function getSplit(lineString) {
    const pattern = /([-]{2,}>)/g;
    return [...lineString.matchAll(pattern)].map(match => match[0]);
}

function getItems(lineString) {
    return lineString.split(/[-]{2,}>/).map(item => item.trim());
}

function convert(content) {
    const lines = content.trim().split('\n');
    const code = generateLetterCode();
    const codeItem = {};
    const rc = [];

    for (const line of lines) {
        const items = getItems(line);
        for (const item of items) {
            if (!codeItem.hasOwnProperty(item)) {
                codeItem[item] = code.next().value;
            }
        }
        if (items.length === 2) {
            rc.push(
                `${getLstrip(line)} ${codeItem[items[0]]}[${items[0]}] ${getSplit(line)[0]} ${codeItem[items[1]]}[${items[1]}]`
            );
        } else {
            rc.push(line);
        }
    }

    return rc;
}

// 数据输入
const data = `
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
`;

// 使用转换函数并输出结果
const result = convert(data);
result.forEach(line => console.log(line));