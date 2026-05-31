// Admin login/register/reset flow using localStorage
(() => {
  const usersKey = 'adminUsers';
  const sessionKey = 'adminSession';

  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const resetForm = document.getElementById('reset-form');
  const loginTab = document.getElementById('tab-login');
  const registerTab = document.getElementById('tab-register');
  const forgotButton = document.getElementById('forgot-password');
  const showLoginButton = document.getElementById('show-login');
  const resetCancel = document.getElementById('reset-cancel');
  const loginError = document.getElementById('login-error');
  const registerError = document.getElementById('register-error');
  const registerSuccess = document.getElementById('register-success');
  const resetError = document.getElementById('reset-error');
  const resetSuccess = document.getElementById('reset-success');
  const togglePass = document.getElementById('toggle-pass');

  const getUsers = () => {
    try {
      return JSON.parse(localStorage.getItem(usersKey) || '[]');
    } catch (err) {
      return [];
    }
  };

  const saveUsers = (users) => {
    localStorage.setItem(usersKey, JSON.stringify(users));
  };

  const setSession = (username) => {
    localStorage.setItem(sessionKey, username);
  };

  const clearSession = () => {
    localStorage.removeItem(sessionKey);
  };

  const currentUser = () => localStorage.getItem(sessionKey);

  const findUser = (username, password) => {
    return getUsers().find((user) => user.username === username && user.password === password);
  };

  const findUserByName = (username) => {
    return getUsers().find((user) => user.username === username);
  };

  const showSection = (section) => {
    if (loginForm) loginForm.style.display = section === 'login' ? '' : 'none';
    if (registerForm) registerForm.style.display = section === 'register' ? '' : 'none';
    if (resetForm) resetForm.style.display = section === 'reset' ? '' : 'none';
    if (loginTab) loginTab.classList.toggle('active', section === 'login');
    if (registerTab) registerTab.classList.toggle('active', section === 'register');
    if (loginTab && registerTab && section === 'reset') {
      loginTab.classList.remove('active');
      registerTab.classList.remove('active');
    }
    clearMessages();
  };

  const clearMessages = () => {
    [loginError, registerError, registerSuccess, resetError, resetSuccess].forEach((el) => {
      if (el) el.style.display = 'none';
    });
  };

  const showError = (el, text) => {
    if (el) {
      el.textContent = text;
      el.style.display = 'block';
      el.classList.remove('shake');
      void el.offsetWidth;
      el.classList.add('shake');
    }
  };

  const handleLogin = (e) => {
    if (e) e.preventDefault();
    clearMessages();
    const username = document.getElementById('adm-username').value.trim();
    const password = document.getElementById('adm-password').value;

    if (!username || !password) {
      showError(loginError, 'Please enter both username and password.');
      return;
    }

    const user = findUser(username, password);
    if (user) {
      setSession(user.username);
      window.location.href = 'dashboard.html';
    } else {
      showError(loginError, 'Invalid username or password.');
    }
  };

  const handleRegister = (e) => {
    if (e) e.preventDefault();
    clearMessages();
    const username = document.getElementById('reg-username').value.trim();
    const profession = document.getElementById('reg-profession').value.trim();
    const password = document.getElementById('reg-password').value;

    if (!username || !password) {
      showError(registerError, 'Username and password are required.');
      return;
    }

    if (findUserByName(username)) {
      showError(registerError, 'That username already exists. Please choose another.');
      return;
    }

    const users = getUsers();
    users.push({ username, profession, password });
    saveUsers(users);
    registerSuccess.style.display = 'block';
    setTimeout(() => {
      setSession(username);
      window.location.href = 'dashboard.html';
    }, 900);
  };

  const handleReset = (e) => {
    if (e) e.preventDefault();
    clearMessages();
    const username = document.getElementById('reset-username').value.trim();
    const password = document.getElementById('reset-password').value;

    if (!username || !password) {
      showError(resetError, 'Please enter your username and new password.');
      return;
    }

    const users = getUsers();
    const user = users.find((item) => item.username === username);
    if (!user) {
      showError(resetError, 'Username not found.');
      return;
    }

    user.password = password;
    saveUsers(users);
    resetSuccess.style.display = 'block';
    setTimeout(() => showSection('login'), 900);
  };

  if (togglePass) {
    togglePass.addEventListener('click', () => {
      const pwd = document.getElementById('adm-password');
      if (pwd) {
        const visible = pwd.type === 'text';
        pwd.type = visible ? 'password' : 'text';
        togglePass.innerHTML = `<i class="fa ${visible ? 'fa-eye' : 'fa-eye-slash'}"></i>`;
        togglePass.setAttribute('aria-label', visible ? 'Show password' : 'Hide password');
      }
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }

  const registerBtn = document.getElementById('adm-register');
  if (registerForm) {
    registerForm.addEventListener('submit', handleRegister);
  }

  const resetBtn = document.getElementById('adm-reset');
  if (resetForm) {
    resetForm.addEventListener('submit', handleReset);
  }

  if (loginTab) {
    loginTab.addEventListener('click', () => showSection('login'));
  }

  if (registerTab) {
    registerTab.addEventListener('click', () => showSection('register'));
  }

  if (forgotButton) {
    forgotButton.addEventListener('click', () => showSection('reset'));
  }

  if (showLoginButton) {
    showLoginButton.addEventListener('click', () => showSection('login'));
  }

  if (resetCancel) {
    resetCancel.addEventListener('click', () => showSection('login'));
  }

  const logoLink = document.getElementById('logo-link');
  if (logoLink) {
    logoLink.addEventListener('click', (e) => {
      e.preventDefault();
      if (currentUser()) {
        window.location.href = 'dashboard.html';
      } else {
        showSection('login');
        const usernameInput = document.getElementById('adm-username');
        if (usernameInput) usernameInput.focus();
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (currentUser()) {
      window.location.href = 'dashboard.html';
    } else {
      showSection('login');
    }
  });
})();
