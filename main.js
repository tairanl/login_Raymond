import './style.scss'

const password = document.getElementById("password")
const passwordToggle = document.querySelector(".password_icon")

console.log(password);
console.log(passwordToggle);

// 点击显示或隐藏密码功能
passwordToggle.addEventListener('click', () => {
    if (password.type === 'password') {
        // 将属性改为text,密码就会被展示
        password.setAttribute('type', 'text')
            // 这一步是为了预防html里面已经存在了show，这function又额外添加了show,所以先消除show，再加一个，确保有且只有一个show
        passwordToggle.classList.remove('show')
        passwordToggle.classList.add('show')

    } else {
        password.setAttribute('type', 'password')
    }
})

password.addEventListener('keyup', () => {
    console.log(password.value);
    checkPassword(password.value)
})

function checkPassword(info) {
    const passwordMsg = document.getElementById("password_msg")
    passwordMsg.textContent = '需要'
        // 正则表达式
        // 检查小写字母
        // 解读为 ？前面内容， .为除了换行符外的任何单个字符， [a-z]为范围是小写a到小写z
        // 将前面内容里的每一个字符进行匹配，匹配范围是a到z
    const lower = new RegExp('(?=.*[a-z])')
    const upper = new RegExp('(?=.*[A-Z])')
    const number = new RegExp('(?=.*[0-9])')
        // $在正则表达式有结尾的意思，加以一个反斜杠说明这只是一个字符而非结尾
    const special = new RegExp('(?=.*[!@#\$%\^&\*])')
        // 匹配长度,下面解读为范围是 8到无限大，最短为8位字符串
    const length = new RegExp('(?=.{8,})')
        // 上面的正则表达式会返回一个true或false，可用该结果进行判断

    // const email = new RegExp('(^.[a-z])')

    let flag = false;

    if (!lower.test(info)) {
        passwordMsg.textContent = passwordMsg.textContent + " 小写"
            // 然后设置一个flag,默认为false
        flag = true
    }
    if (!upper.test(info)) {
        passwordMsg.textContent += " 大写"
        flag = true
    }
    if (!number.test(info)) {
        passwordMsg.textContent += " 数字"
        flag = true
    }
    if (!special.test(info)) {
        passwordMsg.textContent += " 特殊符号"
        flag = true
    }
    if (!length.test(info)) {
        passwordMsg.textContent += " 长度至少为8位"
        flag = true
    }

    const passwordGroup = document.getElementById("password_group")
    if (flag) {
        passwordGroup.classList.remove('success')
        passwordGroup.classList.add('error')
    } else {
        passwordMsg.textContent = '满足密码需求'
        passwordGroup.classList.remove('error')
        passwordGroup.classList.add('success')
    }
}