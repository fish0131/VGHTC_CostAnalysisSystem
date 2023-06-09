export class AuthService {

  userInfo = {
    loggedIn: false,
    identity: '',
    name: '',
    department: ''
  }
  
  isAuthenticated() {
    const promise = new Promise((resolve, rejct) => {
      setTimeout(() => {
        resolve(this.userInfo.loggedIn);
      }, 800);
    });
    return promise;
  }

  login(account: string, password: string) {
    if (account === 'vghtc' && password === '123') {
      this.userInfo.loggedIn = true;
      this.userInfo.identity = 'manager';
      this.userInfo.name = '韓xx';
      this.userInfo.department = '主計室';
      alert('登入成功');
    } 
    else if (account === 'user' && password === '987')
    {
      this.userInfo.loggedIn = true;
      this.userInfo.identity = 'user';
      this.userInfo.name = '林xx';
      this.userInfo.department = '神經外科';
      alert('登入成功');
    }
    else {
      this.userInfo.loggedIn = false;
      //alert('登入失敗');
    }
  }

  logout() {
    this.userInfo.loggedIn = false;
  }
}
