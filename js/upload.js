function goHome() {
  window.location.href = './index.html';
}
const db = firebase.firestore();
const storage = firebase.storage();
function inputValue() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      if (document.getElementById('image').value == '') {
        db.collection('Users')
          .doc(`${user.email}`)
          .get()
          .then((currentUser) => {
            let objects = {
              userId: user.email,
              title: document.getElementById('title').value,
              contents: document.getElementById('content').value,
              imgURL: `${currentUser.data().photoURL}`,
              name: `${currentUser.data().nickname}`,
              role: `${currentUser.data().role}`,
              date: new Date(),
            };
            db.collection('Board')
              .add(objects)
              .then(() => {
                alert('업로드 성공');
                window.location.href = './index.html';
              })
              .catch((err) => {
                console.log(err);
                alert('업로드 실패, 올리기 버튼을 다시 눌러주세요.');
              });
          });
      } else {
        let file = document.getElementById('image').files[0];
        let storageRef = storage.ref();
        let imagePath = storageRef.child('image/' + file.name);
        let uploadImg = imagePath.put(file);

        uploadImg.on(
          'state_changed',
          // 변화시 동작하는 함수
          null,
          //에러시 동작하는 함수
          (error) => {
            console.error('실패사유는', error);
          },
          // 성공시 동작하는 함수
          () => {
            uploadImg.snapshot.ref.getDownloadURL().then((url) => {
              db.collection('Users')
                .doc(`${user.email}`)
                .get()
                .then((currentUser) => {
                  let objects = {
                    userId: user.email,
                    title: document.getElementById('title').value,
                    contents: document.getElementById('content').value,
                    imgURL: `${currentUser.data().photoURL}`,
                    name: `${currentUser.data().nickname}`,
                    role: `${currentUser.data().role}`,
                    date: new Date(),
                    img: url,
                  };
                  db.collection('Board')
                    .add(objects)
                    .then(() => {
                      alert('업로드 성공');
                      window.location.href = './index.html';
                    })
                    .catch((err) => {
                      console.log(err);
                      alert('업로드 실패, 올리기 버튼을 다시 눌러주세요.');
                    });
                });
            });
          }
        );
      }
    } else {
      alert('회원 정보를 불러올수 없습니다.');
    }
  });
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
    document.getElementById('with-login1').className = 'text-center';
    document.getElementById('with-login1').innerHTML =
      "<div><h1 class='font-semibold mb-2'>댓글은 로그인후 작성 가능합니다.</h1></div>";
    document.getElementById('with-login2').className = 'hidden';
    document.getElementById('with-login3').className = 'hidden';
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
