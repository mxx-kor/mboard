const db = firebase.firestore();
const storage = firebase.storage();
function clickLogIn() {
  let email = document.getElementById('email').value;
  let password = document.getElementById('pw').value;
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      alert('로그인 성공');
      window.location.href = './index.html';
    })
    .catch((error) => {
      let errorCode = error.code;
      let errorMessage = error.message;
      alert(errorMessage);
    });
}
function enterkey() {
  if (window.event.keyCode == 13) {
    let email = document.getElementById('email').value;
    let password = document.getElementById('pw').value;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        alert('로그인 성공');
        window.location.href = './index.html';
      })
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        alert(errorMessage);
      });
  }
}

function goHome() {
  window.location.href = './index.html';
}
//로그인 되어있는지 확인 후 프로필 설정, 버튼 재 설정
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    document.getElementById('log-in').className = 'hidden';
    document.getElementById('log-out').className =
      'inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500';
    document.getElementById('sign-up').className = 'hidden';
    db.collection('Users')
      .doc(`${user.email}`)
      .get()
      .then((info) => {
        document.getElementById('profile-role').innerText = info.data().role;
        document.getElementById('profile-nick').innerText =
          info.data().nickname;
        if (info.data().photoURL !== null) {
          document
            .getElementById('profile-img')
            .setAttribute('src', `${info.data().photoURL}`);
        }
      });
    // 댓글 기능 로그인시에만 가능하도록
  } else {
    document.getElementById('write').className = 'hidden';
    document.getElementById('log-out').className = 'hidden';
    document.getElementById('nav-bar-profile').remove();
  }
});
// 로그아웃
function logOut() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      alert('로그아웃되었습니다.');
      window.location.reload();
    })
    .catch((error) => {
      alert(error.message);
    });
}
// 프로필 클릭
function profileClick() {
  window.location.href = './profile.html';
}
