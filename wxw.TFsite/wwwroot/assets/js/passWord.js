// 密码框检测密码强度------------------------------
// 获取DOM元素
const passwordInput = document.getElementById('password');
const togglePassword = document.getElementById('togglePassword');
const strengthBar = document.getElementById('strengthBar');
const strengthText = document.getElementById('strengthText');
const charCount = document.getElementById('charCount');
const createAccountBtn = document.getElementById('createAccountBtn');

// 密码标准检查元素
const criteriaLength = document.getElementById('criteriaLength');
const criteriaUppercase = document.getElementById('criteriaUppercase');
const criteriaNumber = document.getElementById('criteriaNumber');

// 切换密码可见性
togglePassword.addEventListener('click', function () {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);

    // 切换图标
    this.innerHTML = type === 'password' ? '<span class="eye-slash-icon"></span>' : '<span class="eye-icon"></span>';
});

// 密码强度检测
passwordInput.addEventListener('input', function () {
    const password = this.value;
    const length = password.length;

    // 密码强度评分 (0-100)
    let score = 0;
    let criteriaMet = 0;

    // 基本长度检查
    const hasLength = length >= 8;
    if (hasLength) {
        score += 33;
        criteriaMet++;
        updateCriteria(criteriaLength, true);
    } else {
        updateCriteria(criteriaLength, false);
    }

    // 包含大写字母
    const hasUppercase = /[A-Z]/.test(password);
    if (hasUppercase) {
        score += 33;
        criteriaMet++;
        updateCriteria(criteriaUppercase, true);
    } else {
        updateCriteria(criteriaUppercase, false);
    }

    // 包含数字
    const hasNumber = /[0-9]/.test(password);
    if (hasNumber) {
        score += 34; // 给数字多1分，确保总分能到100
        criteriaMet++;
        updateCriteria(criteriaNumber, true);
    } else {
        updateCriteria(criteriaNumber, false);
    }

    // 更新强度条和文本
    updateStrengthMeter(score, criteriaMet);

    // 启用/禁用按钮
    // if (criteriaMet === 3) {
    //   createAccountBtn.disabled = false;
    // } else {
    //   createAccountBtn.disabled = true;
    // }
});

// 更新密码标准状态
function updateCriteria(element, met) {
    if (met) {
        element.className = 'criteria-icon criteria-icon-valid';
    } else {
        element.className = 'criteria-icon criteria-icon-invalid';
    }
}

// 更新强度条和文本
function updateStrengthMeter(score, criteriaMet) {
    let strengthClass = '';

    if (score === 0) {
        strengthClass = 'bg-transparent';
        // strengthLabel = '密码强度';
    } else if (criteriaMet === 1) {
        strengthClass = 'bg-weak';
        // strengthLabel = '弱';
    } else if (criteriaMet === 2) {
        strengthClass = 'bg-medium';
        // strengthLabel = '中等';
    } else {
        strengthClass = 'bg-strong';
        // strengthLabel = '强';
    }

    // 更新强度条
    strengthBar.className = `strength-bar ${strengthClass}`;
    strengthBar.style.width = `${score}%`;
}
//检测密码强度------------------------------