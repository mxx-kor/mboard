function goHome() {
  window.location.href = './index.html';
}
const db = firebase.firestore();
const storage = firebase.storage();
const noPhoto =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEXk5ueutLfn6eqrsbTp6+zg4uOwtrnJzc/j5earsbW0uby4vcDQ09XGyszU19jd3+G/xMamCvwDAAAFLklEQVR4nO2d2bLbIAxAbYE3sDH//7WFbPfexG4MiCAcnWmnrzkjIRaD2jQMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMw5wQkHJczewxZh2lhNK/CBOQo1n0JIT74/H/qMV0Z7GU3aCcVPuEE1XDCtVLAhgtpme7H0s1N1U7QjO0L8F7llzGeh1hEG/8Lo7TUmmuSrOfns9xnGXpXxsONPpA/B6OqqstjC6Ax/0ujkNdYQQbKNi2k64qiiEZ+ohi35X+2YcZw/WujmslYewiAliVYrxgJYrdwUmwXsU+RdApUi83oNIE27YvrfB/ZPg8+BJETXnqh9CVzBbTQHgojgiCvtqU9thFJg/CKz3VIMKMEkIXxIWqIpIg2SkjYj+xC816mrJae2aiWGykxRNsW0UwiJghJDljYI5CD8GRiCtIsJxizYUPQ2pzItZy5pcisTRdk/a9m4amtNNfBuQkdVhSaYqfpNTSFGfb9GRIakrE2Pm+GFLaCQPqiu0OpWP+HMPQQcgQMiQprWXNmsVwIjQjYi/ZrhAqNTCgr2gu0Jnz85RSSjso0HkMFZ0YZjKkc26a/jlmh9JiDyDxi9oeorTYAzZkwwoMz19pzj9bnH/GP/+qbchjSGflneWYhtTuKdMOmNKZcJ5TjInQKcYXnESd/jQxy0ENpULTNGOGgxpap/oyw9pbUAqhfx2Dbkhovvfgz4iUzoM9+GlK6/Mh4q29hyC1mwro30hpVVLPF9wYQr71RazOeM5/cw81iBRD+A03aM9/C/obbrKjbYSpCmIVG3qT/Q8oeUo3Rz0IL7vI1tEbCB9pSiu8I/aV8x3Kg/BGWrWp4ZVs0nZfmAoEG4h/61yHYIJiFSl6Q0Vk6tTW1N8kYp8hdOkfHYYMXd2Qft+8CYwqYDSKvqIh+MCF8Wgca2u/cwdgeW3TtuVn6+1oBs3yLo5C2JpK6CvQzGpfUkz9UG/87gCsi5o2LIXolxN0FbwAsjOLEr+YJmXn7iR6N0BCt5p5cMxm7eAsfS+/CACQf4CTpKjzgkvr2cVarVTf96372yut7XLJ1sa7lv6VcfgYrWaxqr3Wlo1S6pvStr22sxOtTNPLzdY3nj20bPP+ejFdJYkLsjGLdtPBEbe/mr2bQKiXWJDroA+vtzc0p9aahuwqHMDYrQEXHEw9jwQl3drMpts9JBU1SdktPe5FBRdJQ6bwXBpa57ib2A8kukQDzMjh++Uo7Fo6Wd02Pkf4fknqoo4HtvAIjsqUcjx6DIPgWCaOML9rKI/oqD9/lgNrn+eF+p7j8tnzHBiR7+kdUGw/+V1Kzkc75mMy6U+FMaxjPibiM1U1uGM+puInHpmALZCgP4pt7i840MV8+0R1zPsRB6UTcqpizncYwZ89syDydfyWCwXB1l8/zRNGWbTG/GHKUm9AkxHMc/EGSk3z2+ArEhPEV5TUBLEvUGFcjEUH80J/jveTGOAJEljJbILWGQT3zRYiwuKsUXN1EEJAzBhRJFll7mBUG7KD8EqPkKekBREaL8hMDZLQSG6AQjtHPYmvTQnX0TtpC1SYCe2YdkkyLP3jj5BSbKiuR585eQhTgoje6yIb0Yb0C+mV6EYvebqw5SDy2WmubogZiF2AVxPC2FpDf8H2Q9QWo6IkjUxTWVEI3WY/wrCeSuqJ+eRWzXR/JXwgVjUMozbCOfoEZiSiKVGepqv5CJ8RyR4D7xBeamqa7z3BJ/z17JxuBPdv93d/a2Ki878MMAzDMAzDMAzDMAzDMF/KP09VUmxBAiI3AAAAAElFTkSuQmCC';

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
        document.getElementById('fix-btn').id = `${user.email}`;
        document.getElementById('delete-btn').id = `${user.email}`;
        document.getElementById('profile-role').innerText = info.data().role;
        document.getElementById('profile-nick').innerText =
          info.data().nickname;
        document.getElementById('nick-fix').value = info.data().nickname;
        if (info.data().photoURL !== noPhoto) {
          document
            .getElementById('profile-img')
            .setAttribute('src', `${info.data().photoURL}`);
          document
            .getElementById('profile-img-OG')
            .setAttribute('src', `${info.data().photoURL}`);
        }
      });
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
      window.location.href = './index.html';
    })
    .catch((error) => {
      alert(error.message);
    });
}
// 프로필 클릭
function profileClick() {
  window.location.href = './profile.html';
}

let userNickname = [];
db.collection('Users')
  .get()
  .then((each) => {
    each.forEach((items) => {
      userNickname.push(items.data().nickname);
    });
  });

//프로필 수정
let profilePhotoFix = document.getElementById('profile-photo-fix');
function editProfile(userEmail) {
  let userRef = db.collection('Users').doc(`${userEmail}`);
  if (
    userNickname.indexOf(`${document.getElementById('nick-fix').value}`) == 0
  ) {
    alert('중복되는 닉네임입니다.');
  } else {
    // 업로드된 사진 없을때
    if (profilePhotoFix.value == '') {
      userRef
        .update({
          nickname: document.getElementById('nick-fix').value,
        })
        .then(() => {
          alert('프로필이 수정되었습니다.');
          window.location.href = './index.html';
        })
        .catch((error) => {
          alert('Error writing document: ' + error);
        });
    } else {
      let file = profilePhotoFix.files[0];
      let storageRef = storage.ref();
      let imagePath = storageRef.child('profilePhoto/' + file.name);
      let uploadImg = imagePath.put(file);

      if (
        document.getElementById('profile-img-OG').src ==
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEXk5ueutLfn6eqrsbTp6+zg4uOwtrnJzc/j5earsbW0uby4vcDQ09XGyszU19jd3+G/xMamCvwDAAAFLklEQVR4nO2d2bLbIAxAbYE3sDH//7WFbPfexG4MiCAcnWmnrzkjIRaD2jQMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMw5wQkHJczewxZh2lhNK/CBOQo1n0JIT74/H/qMV0Z7GU3aCcVPuEE1XDCtVLAhgtpme7H0s1N1U7QjO0L8F7llzGeh1hEG/8Lo7TUmmuSrOfns9xnGXpXxsONPpA/B6OqqstjC6Ax/0ujkNdYQQbKNi2k64qiiEZ+ohi35X+2YcZw/WujmslYewiAliVYrxgJYrdwUmwXsU+RdApUi83oNIE27YvrfB/ZPg8+BJETXnqh9CVzBbTQHgojgiCvtqU9thFJg/CKz3VIMKMEkIXxIWqIpIg2SkjYj+xC816mrJae2aiWGykxRNsW0UwiJghJDljYI5CD8GRiCtIsJxizYUPQ2pzItZy5pcisTRdk/a9m4amtNNfBuQkdVhSaYqfpNTSFGfb9GRIakrE2Pm+GFLaCQPqiu0OpWP+HMPQQcgQMiQprWXNmsVwIjQjYi/ZrhAqNTCgr2gu0Jnz85RSSjso0HkMFZ0YZjKkc26a/jlmh9JiDyDxi9oeorTYAzZkwwoMz19pzj9bnH/GP/+qbchjSGflneWYhtTuKdMOmNKZcJ5TjInQKcYXnESd/jQxy0ENpULTNGOGgxpap/oyw9pbUAqhfx2Dbkhovvfgz4iUzoM9+GlK6/Mh4q29hyC1mwro30hpVVLPF9wYQr71RazOeM5/cw81iBRD+A03aM9/C/obbrKjbYSpCmIVG3qT/Q8oeUo3Rz0IL7vI1tEbCB9pSiu8I/aV8x3Kg/BGWrWp4ZVs0nZfmAoEG4h/61yHYIJiFSl6Q0Vk6tTW1N8kYp8hdOkfHYYMXd2Qft+8CYwqYDSKvqIh+MCF8Wgca2u/cwdgeW3TtuVn6+1oBs3yLo5C2JpK6CvQzGpfUkz9UG/87gCsi5o2LIXolxN0FbwAsjOLEr+YJmXn7iR6N0BCt5p5cMxm7eAsfS+/CACQf4CTpKjzgkvr2cVarVTf96372yut7XLJ1sa7lv6VcfgYrWaxqr3Wlo1S6pvStr22sxOtTNPLzdY3nj20bPP+ejFdJYkLsjGLdtPBEbe/mr2bQKiXWJDroA+vtzc0p9aahuwqHMDYrQEXHEw9jwQl3drMpts9JBU1SdktPe5FBRdJQ6bwXBpa57ib2A8kukQDzMjh++Uo7Fo6Wd02Pkf4fknqoo4HtvAIjsqUcjx6DIPgWCaOML9rKI/oqD9/lgNrn+eF+p7j8tnzHBiR7+kdUGw/+V1Kzkc75mMy6U+FMaxjPibiM1U1uGM+puInHpmALZCgP4pt7i840MV8+0R1zPsRB6UTcqpizncYwZ89syDydfyWCwXB1l8/zRNGWbTG/GHKUm9AkxHMc/EGSk3z2+ArEhPEV5TUBLEvUGFcjEUH80J/jveTGOAJEljJbILWGQT3zRYiwuKsUXN1EEJAzBhRJFll7mBUG7KD8EqPkKekBREaL8hMDZLQSG6AQjtHPYmvTQnX0TtpC1SYCe2YdkkyLP3jj5BSbKiuR585eQhTgoje6yIb0Yb0C+mV6EYvebqw5SDy2WmubogZiF2AVxPC2FpDf8H2Q9QWo6IkjUxTWVEI3WY/wrCeSuqJ+eRWzXR/JXwgVjUMozbCOfoEZiSiKVGepqv5CJ8RyR4D7xBeamqa7z3BJ/z17JxuBPdv93d/a2Ki878MMAzDMAzDMAzDMAzDMF/KP09VUmxBAiI3AAAAAElFTkSuQmCC'
      ) {
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
              userRef
                .update({
                  nickname: document.getElementById('nick-fix').value,
                  photoURL: url,
                })
                .then(() => {
                  alert('프로필이 수정되었습니다.');
                  window.location.href = './index.html';
                })
                .catch((error) => {
                  alert('Error writing document: ' + error);
                });
            });
          }
        );
      } else {
        //일단 이미지 지우고
        userRef.get().then((doc) => {
          let httpsReference = storage.refFromURL(`${doc.data().photoURL}`);
          let desertRef = storage
            .ref()
            .child(`${httpsReference._delegate._location.path_}`);
          desertRef
            .delete()
            .then(() => {
              alert('the og img successfully deleted');
            })
            .catch((error) => {
              alert('이미지 바꾸다가 오류!');
            });
        });
        //다시 이미지 넣자

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
              userRef
                .update({
                  nickname: document.getElementById('nick-fix').value,
                  photoURL: url,
                })
                .then(() => {
                  alert('프로필 수정 성공');
                  window.location.href = './index.html';
                })
                .catch((err) => {
                  console.log(err);
                  alert('수정 실패, 수정 버튼을 다시 눌러주세요.');
                });
            });
          }
        );
      }
    }
  }
}
// 탈퇴 기능
function deleteUser(a) {
  db.collection('Users')
    .doc(`${a}`)
    .get()
    .then((info) => {
      if (info.data().photoURL == noPhoto) {
        db.collection('Users').doc(`${a}`).delete();
        firebase
          .auth()
          .currentUser.delete()
          .then(() => {
            alert('탈퇴되었습니다.');
            window.location.href = './index.html';
          });
      } else {
        let httpsReference = storage.refFromURL(`${info.data().photoURL}`);
        let desertRef = storage
          .ref()
          .child(`${httpsReference._delegate._location.path_}`);
        desertRef
          .delete()
          .then(() => {
            alert('프로필 사진이 삭제되었습니다.');
          })
          .catch(() => {
            alert('이미지 삭제하다 오류!');
          });
        db.collection('Users').doc(`${a}`).delete();
        firebase
          .auth()
          .currentUser.delete()
          .then(() => {
            alert('탈퇴되었습니다.');
            window.location.href = './index.html';
          });
      }
    });
}
