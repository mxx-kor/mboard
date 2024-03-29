function goHome() {
  window.location.href = './index.html';
}

const db = firebase.firestore();
const noPhoto =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEXk5ueutLfn6eqrsbTp6+zg4uOwtrnJzc/j5earsbW0uby4vcDQ09XGyszU19jd3+G/xMamCvwDAAAFLklEQVR4nO2d2bLbIAxAbYE3sDH//7WFbPfexG4MiCAcnWmnrzkjIRaD2jQMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMw5wQkHJczewxZh2lhNK/CBOQo1n0JIT74/H/qMV0Z7GU3aCcVPuEE1XDCtVLAhgtpme7H0s1N1U7QjO0L8F7llzGeh1hEG/8Lo7TUmmuSrOfns9xnGXpXxsONPpA/B6OqqstjC6Ax/0ujkNdYQQbKNi2k64qiiEZ+ohi35X+2YcZw/WujmslYewiAliVYrxgJYrdwUmwXsU+RdApUi83oNIE27YvrfB/ZPg8+BJETXnqh9CVzBbTQHgojgiCvtqU9thFJg/CKz3VIMKMEkIXxIWqIpIg2SkjYj+xC816mrJae2aiWGykxRNsW0UwiJghJDljYI5CD8GRiCtIsJxizYUPQ2pzItZy5pcisTRdk/a9m4amtNNfBuQkdVhSaYqfpNTSFGfb9GRIakrE2Pm+GFLaCQPqiu0OpWP+HMPQQcgQMiQprWXNmsVwIjQjYi/ZrhAqNTCgr2gu0Jnz85RSSjso0HkMFZ0YZjKkc26a/jlmh9JiDyDxi9oeorTYAzZkwwoMz19pzj9bnH/GP/+qbchjSGflneWYhtTuKdMOmNKZcJ5TjInQKcYXnESd/jQxy0ENpULTNGOGgxpap/oyw9pbUAqhfx2Dbkhovvfgz4iUzoM9+GlK6/Mh4q29hyC1mwro30hpVVLPF9wYQr71RazOeM5/cw81iBRD+A03aM9/C/obbrKjbYSpCmIVG3qT/Q8oeUo3Rz0IL7vI1tEbCB9pSiu8I/aV8x3Kg/BGWrWp4ZVs0nZfmAoEG4h/61yHYIJiFSl6Q0Vk6tTW1N8kYp8hdOkfHYYMXd2Qft+8CYwqYDSKvqIh+MCF8Wgca2u/cwdgeW3TtuVn6+1oBs3yLo5C2JpK6CvQzGpfUkz9UG/87gCsi5o2LIXolxN0FbwAsjOLEr+YJmXn7iR6N0BCt5p5cMxm7eAsfS+/CACQf4CTpKjzgkvr2cVarVTf96372yut7XLJ1sa7lv6VcfgYrWaxqr3Wlo1S6pvStr22sxOtTNPLzdY3nj20bPP+ejFdJYkLsjGLdtPBEbe/mr2bQKiXWJDroA+vtzc0p9aahuwqHMDYrQEXHEw9jwQl3drMpts9JBU1SdktPe5FBRdJQ6bwXBpa57ib2A8kukQDzMjh++Uo7Fo6Wd02Pkf4fknqoo4HtvAIjsqUcjx6DIPgWCaOML9rKI/oqD9/lgNrn+eF+p7j8tnzHBiR7+kdUGw/+V1Kzkc75mMy6U+FMaxjPibiM1U1uGM+puInHpmALZCgP4pt7i840MV8+0R1zPsRB6UTcqpizncYwZ89syDydfyWCwXB1l8/zRNGWbTG/GHKUm9AkxHMc/EGSk3z2+ArEhPEV5TUBLEvUGFcjEUH80J/jveTGOAJEljJbILWGQT3zRYiwuKsUXN1EEJAzBhRJFll7mBUG7KD8EqPkKekBREaL8hMDZLQSG6AQjtHPYmvTQnX0TtpC1SYCe2YdkkyLP3jj5BSbKiuR585eQhTgoje6yIb0Yb0C+mV6EYvebqw5SDy2WmubogZiF2AVxPC2FpDf8H2Q9QWo6IkjUxTWVEI3WY/wrCeSuqJ+eRWzXR/JXwgVjUMozbCOfoEZiSiKVGepqv5CJ8RyR4D7xBeamqa7z3BJ/z17JxuBPdv93d/a2Ki878MMAzDMAzDMAzDMAzDMF/KP09VUmxBAiI3AAAAAElFTkSuQmCC';
const rows = document.getElementById('rows');
let first = db.collection('Board').orderBy('date', 'desc').limit(10);
let pages = 0;
let currentPage = 1;
let lastVisible = '';
let firstVisible = '';
let totalLength = '';

// get total
db.collection('Board')
  .orderBy('date', 'desc')
  .get()
  .then((total) => {
    totalLength = total.docs.length;
    if (totalLength < 10) {
      document.getElementById('total-num').innerText = totalLength;
    } else {
      pages = parseInt(totalLength / 10) + 1;
      // 글의 개수가 적을 때 버튼 사용 못하게
      if (pages <= 1) {
        document.getElementById('next-btn').style.cursor = 'not-allowed';
        document.getElementById('next-btn').setAttribute('onclick', '');
        document.getElementById('previous-btn').style.cursor = 'not-allowed';
        document.getElementById('previous-btn').setAttribute('onclick', '');
        document.getElementById('all-btn').style.cursor = 'not-allowed';
        document.getElementById('all-btn').setAttribute('onclick', '');
      }
      document.getElementById('total-num').innerText = totalLength;
    }
    // show the lists
    first.get().then((items) => {
      // first and last items
      lastVisible = items.docs[items.docs.length - 1];
      firstVisible = items.docs[items.docs.length - 1];
      items.forEach((doc) => {
        writingRows(doc);
      });
    });
  });
// 리스트 만들어주기
function writingRows(doc) {
  let template = document.createElement('tr');
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      db.collection('Users')
        .doc(`${user.email}`)
        .get()
        .then((info) => {
          if (doc.data().userId == user.email || info.data().role == 'admin') {
            // 이미지가 없을 때
            if (doc.data().img == null) {
              template.innerHTML = `<tr>
                  <td class="px-2 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-10 w-10">
                        <img
                          class="h-10 w-10 rounded-full"
                          src="${doc.data().imgURL}"
                          onerror="this.src='${noPhoto}';"
                          alt=""
                        />
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900 dark:text-gray-400">
                          ${doc.data().name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap" id="${
                    doc.id
                  }" onclick="mainclick(this.id)" style="cursor: pointer">
                    <div class="text-sm text-gray-900 dark:text-gray-400">${
                      doc.data().title
                    }</div>
                    <div class="text-sm text-gray-500">no image</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                     ${doc
                       .data()
                       .date.toDate()
                       .getFullYear()
                       .toString()
                       .slice(-2)}/${
                doc.data().date.toDate().getMonth() + 1
              }/${doc.data().date.toDate().getDate()} ${doc
                .data()
                .date.toDate()
                .getHours()}:${doc.data().date.toDate().getMinutes()}:${doc
                .data()
                .date.toDate()
                .getSeconds()}
                  </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    ${doc.data().role}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <a onclick="editClick(this.id)" class="text-indigo-600 hover:text-indigo-900" id="${
                      doc.id
                    }" style="cursor:pointer;">
                      Edit
                    </a>
                  </td>
                </tr>`;
              rows.append(template);
            } else {
              //이미지가 있을때
              template.innerHTML = `<tr>
                  <td class="px-2 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-10 w-10">
                        <img
                          class="h-10 w-10 rounded-full"
                          src="${doc.data().imgURL}"
                          onerror="this.src='${noPhoto}';"
                          alt=""
                        />
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900 dark:text-gray-400">
                          ${doc.data().name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap" id="${
                    doc.id
                  }" onclick="mainclick(this.id)" style="cursor: pointer">
                    <div class="text-sm text-gray-900 dark:text-gray-400">${
                      doc.data().title
                    }</div>
                    <div class="text-sm text-gray-500">there's img</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                     ${doc
                       .data()
                       .date.toDate()
                       .getFullYear()
                       .toString()
                       .slice(-2)}/${
                doc.data().date.toDate().getMonth() + 1
              }/${doc.data().date.toDate().getDate()} ${doc
                .data()
                .date.toDate()
                .getHours()}:${doc.data().date.toDate().getMinutes()}:${doc
                .data()
                .date.toDate()
                .getSeconds()}
                  </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    ${doc.data().role}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <a onclick="editClick(this.id)" class="text-indigo-600 hover:text-indigo-900" id="${
                      doc.id
                    }" style="cursor:pointer;">
                      Edit
                    </a>
                  </td>
                </tr>`;
              rows.append(template);
            }
          } else {
            //이미지가 없을 때
            if (doc.data().img == null) {
              template.innerHTML = `<tr>
                  <td class="px-2 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-10 w-10">
                        <img
                          class="h-10 w-10 rounded-full"
                          src="${doc.data().imgURL}"
                          onerror="this.src='${noPhoto}';"
                          alt=""
                        />
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900 dark:text-gray-400">
                          ${doc.data().name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap" id="${
                    doc.id
                  }" onclick="mainclick(this.id)" style="cursor: pointer">
                    <div class="text-sm text-gray-900 dark:text-gray-400">${
                      doc.data().title
                    }</div>
                    <div class="text-sm text-gray-500">no image</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                     ${doc
                       .data()
                       .date.toDate()
                       .getFullYear()
                       .toString()
                       .slice(-2)}/${
                doc.data().date.toDate().getMonth() + 1
              }/${doc.data().date.toDate().getDate()} ${doc
                .data()
                .date.toDate()
                .getHours()}:${doc.data().date.toDate().getMinutes()}:${doc
                .data()
                .date.toDate()
                .getSeconds()}
                  </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    ${doc.data().role}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <a onclick="editClick(this.id)" class="hidden text-indigo-600 hover:text-indigo-900" id="${
                      doc.id
                    }" style="cursor:pointer;">
                      Edit
                    </a>
                  </td>
                </tr>`;
              rows.append(template);
            } else {
              //이미지가 있을 때
              template.innerHTML = `<tr>
                  <td class="px-2 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-10 w-10">
                        <img
                          class="h-10 w-10 rounded-full"
                          src="${doc.data().imgURL}"
                          onerror="this.src='${noPhoto}';"
                          alt=""
                        />
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900 dark:text-gray-400">
                          ${doc.data().name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap" id="${
                    doc.id
                  }" onclick="mainclick(this.id)" style="cursor: pointer">
                    <div class="text-sm text-gray-900 dark:text-gray-400">${
                      doc.data().title
                    }</div>
                    <div class="text-sm text-gray-500">there's img</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                     ${doc
                       .data()
                       .date.toDate()
                       .getFullYear()
                       .toString()
                       .slice(-2)}/${
                doc.data().date.toDate().getMonth() + 1
              }/${doc.data().date.toDate().getDate()} ${doc
                .data()
                .date.toDate()
                .getHours()}:${doc.data().date.toDate().getMinutes()}:${doc
                .data()
                .date.toDate()
                .getSeconds()}
                  </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    ${doc.data().role}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <a onclick="editClick(this.id)" class="hidden text-indigo-600 hover:text-indigo-900" id="${
                      doc.id
                    }" style="cursor:pointer;">
                      Edit
                    </a>
                  </td>
                </tr>`;
              rows.append(template);
            }
          }
        });
    } else {
      if (doc.data().img == null) {
        template.innerHTML = `<tr>
                  <td class="px-2 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-10 w-10">
                        <img
                          class="h-10 w-10 rounded-full"
                          src="${doc.data().imgURL}"
                          onerror="this.src='${noPhoto}';"
                          alt=""
                        />
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900 dark:text-gray-400">
                          ${doc.data().name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap" id="${
                    doc.id
                  }" onclick="mainclick(this.id)" style="cursor: pointer">
                    <div class="text-sm text-gray-900 dark:text-gray-400">${
                      doc.data().title
                    }</div>
                    <div class="text-sm text-gray-500">no image</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                     ${doc
                       .data()
                       .date.toDate()
                       .getFullYear()
                       .toString()
                       .slice(-2)}/${
          doc.data().date.toDate().getMonth() + 1
        }/${doc.data().date.toDate().getDate()} ${doc
          .data()
          .date.toDate()
          .getHours()}:${doc.data().date.toDate().getMinutes()}:${doc
          .data()
          .date.toDate()
          .getSeconds()}
                  </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    ${doc.data().role}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <a onclick="editClick(this.id)" class="hidden text-indigo-600 hover:text-indigo-900" id="${
                      doc.id
                    }" style="cursor:pointer;">
                      Edit
                    </a>
                  </td>
                </tr>`;
        rows.append(template);
      } else {
        //이미지가 있을 때
        template.innerHTML = `<tr>
                  <td class="px-2 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-10 w-10">
                        <img
                          class="h-10 w-10 rounded-full"
                          src="${doc.data().imgURL}"
                          onerror="this.src='${noPhoto}';"
                          alt=""
                        />
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900 dark:text-gray-400">
                          ${doc.data().name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap" id="${
                    doc.id
                  }" onclick="mainclick(this.id)" style="cursor: pointer">
                    <div class="text-sm text-gray-900 dark:text-gray-400">${
                      doc.data().title
                    }</div>
                    <div class="text-sm text-gray-500">there's img</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                     ${doc
                       .data()
                       .date.toDate()
                       .getFullYear()
                       .toString()
                       .slice(-2)}/${
          doc.data().date.toDate().getMonth() + 1
        }/${doc.data().date.toDate().getDate()} ${doc
          .data()
          .date.toDate()
          .getHours()}:${doc.data().date.toDate().getMinutes()}:${doc
          .data()
          .date.toDate()
          .getSeconds()}
                  </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    ${doc.data().role}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <a onclick="editClick(this.id)" class="hidden text-indigo-600 hover:text-indigo-900" id="${
                      doc.id
                    }" style="cursor:pointer;">
                      Edit
                    </a>
                  </td>
                </tr>`;
        rows.append(template);
      }
    }
  });
}
//all the lists
function morePage() {
  rows.innerHTML = '';
  db.collection('Board')
    .orderBy('date', 'desc')
    .get()
    .then((allItems) => {
      allItems.forEach((allDoc) => {
        writingRows(allDoc);
        document.getElementById('total-num').innerText = totalLength;
      });
    });
}
// next page
function nextPage() {
  if (pages <= currentPage) {
    alert('마지막 페이지입니다.');
  } else {
    currentPage += 1;
    let next = db
      .collection('Board')
      .orderBy('date', 'desc')
      .startAfter(lastVisible)
      .limit(10);

    next.get().then((nextItems) => {
      lastVisible = nextItems.docs[nextItems.docs.length - 1];
      firstVisible =
        nextItems.docs[nextItems.docs.length - nextItems.docs.length];
      rows.innerHTML = '';
      document.getElementById('page-num').innerText = currentPage;
      nextItems.forEach((nextDoc) => {
        writingRows(nextDoc);
      });
    });
  }
}
//previous page
function previousPage() {
  if (currentPage == 1) {
    alert('첫 페이지입니다.');
  } else {
    currentPage -= 1;

    let previous = db
      .collection('Board')
      .orderBy('date', 'desc')
      .endBefore(firstVisible)
      .limitToLast(10);

    previous.get().then((previousItems) => {
      lastVisible = previousItems.docs[previousItems.docs.length - 1];
      firstVisible =
        previousItems.docs[
          previousItems.docs.length - previousItems.docs.length
        ];
      rows.innerHTML = '';
      document.getElementById('page-num').innerText = currentPage;
      previousItems.forEach((nextDoc) => {
        writingRows(nextDoc);
      });
    });
  }
}
// off the toast
function toastOff() {
  document.getElementById('toast-default').className = 'hidden';
}

// 편집기능
const editModal = document.getElementById('edit-modal');
const editTitle = document.getElementById('title');
const editContents = document.getElementById('content');
const deleteBtn = document.getElementById('delete-btn');
const editBtn = document.getElementById('edit-btn');
const imgCheck = document.getElementById('image');

function editClick(a) {
  deleteBtn.id = a;
  editBtn.id = a;
  let docRef = firebase.firestore().collection('Board').doc(`${a}`);
  editModal.className = 'visible container flex justify-center mx-auto';
  docRef
    .get()
    .then((doc) => {
      editTitle.value = doc.data().title;
      editContents.value = doc.data().contents;
    })
    .catch((error) => {
      alert('Error getting document:', error);
    });
}
function xClick() {
  editModal.className = 'hidden container flex justify-center mx-auto';
  editTitle.value = '';
  editContents.value = '';
}
function deleteClick(a) {
  let docRef = firebase.firestore().collection('Board').doc(`${a}`);
  let storage = firebase.storage();
  // delete firestore
  docRef
    .get()
    .then((doc) => {
      if (doc.data().img == undefined) {
        docRef
          .delete()
          .then(() => {
            alert('Document successfully deleted!');
            window.location.href = './index.html';
          })
          .catch((error) => {
            alert('Error removing document: ', error);
          });
      } else {
        let httpsReference = storage.refFromURL(`${doc.data().img}`);
        let desertRef = storage
          .ref()
          .child(`${httpsReference._delegate._location.path_}`);
        desertRef
          .delete()
          .then(() => {
            alert('이미지 지워짐');
            docRef
              .delete()
              .then(() => {
                alert('Document successfully deleted!');
                window.location.href = './index.html';
              })
              .catch((error) => {
                alert('Error removing document: ', error);
              });
          })
          .catch((error) => {
            alert('이미지 지우다 오류!');
          });
      }
    })
    .catch((error) => {
      alert('Error getting document:', error);
    });
}
function rewrite(a) {
  let rewriteDoc = firebase.firestore().collection('Board').doc(`${a}`);
  let storage = firebase.storage();
  if (imgCheck.value == '') {
    rewriteDoc
      .update({
        title: document.getElementById('title').value,
        contents: document.getElementById('content').value,
      })
      .then(() => {
        alert('Document successfully written!');
        window.location.href = './index.html';
      })
      .catch((error) => {
        alert('Error writing document: ' + error);
      });
  } else {
    //일단 이미지 지우고
    rewriteDoc.get().then((doc) => {
      let httpsReference = storage.refFromURL(`${doc.data().img}`);
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
          let objects = {
            title: document.getElementById('title').value,
            contents: document.getElementById('content').value,
            img: url,
          };
          rewriteDoc
            .update(objects)
            .then(() => {
              alert('수정 성공');
              window.location.href = './index.html';
            })
            .catch(() => {
              alert('수정 실패, 수정 버튼을 다시 눌러주세요.');
            });
        });
      }
    );
  }
}

//main modal js
const mainModal = document.getElementById('main-modal');
const mainTitle = document.getElementById('main-title');
const mainContent = document.getElementById('main-content');
const mainImg = document.getElementById('main-img');
const mainModalAbsoulte = document.getElementById('main-modal-absoulte');

function mainclick(a) {
  document.getElementById('comment-submit').ariaLabel = `${a}`;
  //comments
  firebase
    .firestore()
    .collection('Board')
    .doc(`${a}`)
    .collection('comments')
    .get()
    .then((items) => {
      items.forEach((mindoc) => {
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            db.collection('Users')
              .doc(`${user.email}`)
              .get()
              .then((info) => {
                if (
                  mindoc.data().userId == user.email ||
                  info.data().role == 'admin'
                ) {
                  let mainComments = document.getElementById('main-comments');
                  let commentsTemplate = document.createElement('div');
                  document.getElementById('no-comments').className =
                    'flex hidden justify-center border-t border-b py-1 dark:text-gray-400';
                  commentsTemplate.innerHTML = `
                        <div class="flex w-full items-center border-t border-b py-1" id='${
                          mindoc.id
                        }'>
                          <div class="-space-x-2 mr-2">
                            <img
                              class="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                              src="${mindoc.data().photo}"
                              alt=""
                            />
                          </div>
                          <span class="w-2/12 mr-2 dark:text-gray-400">${
                            mindoc.data().name
                          }</span>
                          <span class="w-6/12 dark:text-gray-400">${
                            mindoc.data().contents
                          }</span>
                          <span class="w-4/12 text-right mr-2 dark:text-gray-400">${mindoc
                            .data()
                            .time.toDate()
                            .getFullYear()
                            .toString()
                            .slice(-2)}/${
                    mindoc.data().time.toDate().getMonth() + 1
                  }/${mindoc.data().time.toDate().getDate()} ${mindoc
                    .data()
                    .time.toDate()
                    .getHours()}:${mindoc
                    .data()
                    .time.toDate()
                    .getMinutes()}:${mindoc.data().time.toDate().getSeconds()}
                          </span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="w-5 h-5 dark:text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            style="cursor: pointer"
                            onclick="commentDelete('${mindoc.id}', '${a}')"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>`;
                  mainComments.append(commentsTemplate);
                } else {
                  let mainComments = document.getElementById('main-comments');
                  let commentsTemplate = document.createElement('div');
                  document.getElementById('no-comments').className =
                    'flex hidden justify-center border-t border-b py-1';
                  commentsTemplate.innerHTML = `
                        <div class="flex w-full items-center border-t border-b py-1 dark:text-gray-400" id='${
                          mindoc.id
                        }'>
                          <div class="-space-x-2 mr-2">
                            <img
                              class="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                              src="${mindoc.data().photo}"
                              alt=""
                            />
                          </div>
                          <span class="w-2/12 mr-2 dark:text-gray-400">${
                            mindoc.data().name
                          }</span>
                          <span class="w-6/12 dark:text-gray-400">${
                            mindoc.data().contents
                          }</span>
                          <span class="w-4/12 text-right mr-2 dark:text-gray-400">${mindoc
                            .data()
                            .time.toDate()
                            .getFullYear()
                            .toString()
                            .slice(-2)}/${
                    mindoc.data().time.toDate().getMonth() + 1
                  }/${mindoc.data().time.toDate().getDate()} ${mindoc
                    .data()
                    .time.toDate()
                    .getHours()}:${mindoc
                    .data()
                    .time.toDate()
                    .getMinutes()}:${mindoc.data().time.toDate().getSeconds()}
                          </span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="w-5 h-5 hidden dark:text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            style="cursor: pointer"
                            onclick="commentDelete('${mindoc.id}', '${a}')"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>`;
                  mainComments.append(commentsTemplate);
                }
              });
          } else {
            let mainComments = document.getElementById('main-comments');
            let commentsTemplate = document.createElement('div');
            document.getElementById('no-comments').className =
              'flex hidden justify-center border-t border-b py-1 dark:text-gray-400';
            commentsTemplate.innerHTML = `
                        <div class="flex w-full items-center border-t border-b py-1 dark:text-gray-400" id='${
                          mindoc.id
                        }'>
                          <div class="-space-x-2 mr-2">
                            <img
                              class="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                              src="${mindoc.data().photo}"
                              alt=""
                            />
                          </div>
                          <span class="w-2/12 mr-2 dark:text-gray-400">${
                            mindoc.data().name
                          }</span>
                          <span class="w-6/12 dark:text-gray-400">${
                            mindoc.data().contents
                          }</span>
                          <span class="w-4/12 text-right mr-2 dark:text-gray-400">${mindoc
                            .data()
                            .time.toDate()
                            .getFullYear()
                            .toString()
                            .slice(-2)}/${
              mindoc.data().time.toDate().getMonth() + 1
            }/${mindoc.data().time.toDate().getDate()} ${mindoc
              .data()
              .time.toDate()
              .getHours()}:${mindoc.data().time.toDate().getMinutes()}:${mindoc
              .data()
              .time.toDate()
              .getSeconds()}
                          </span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="w-5 h-5 hidden"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            style="cursor: pointer"
                            onclick="commentDelete('${mindoc.id}', '${a}')"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>`;
            mainComments.append(commentsTemplate);
          }
        });
      });
    });

  firebase
    .firestore()
    .collection('Board')
    .doc(`${a}`)
    .get()
    .then((doc) => {
      if (doc.data().img == undefined) {
        mainModal.className = 'bg-gray-50 visible container';
        mainModalAbsoulte.className =
          'fixed items-center inset-0 flex justify-center bg-gray-700 bg-opacity-50';
        mainTitle.innerText = `제목 : ${doc.data().title}`;
        mainContent.innerText = `내용 : 
              ${doc.data().contents}`;
      } else {
        mainModal.className = 'bg-gray-50 visible container';
        mainModalAbsoulte.className =
          'fixed items-center inset-0 flex justify-center bg-gray-700 bg-opacity-50';
        mainTitle.innerText = `제목 : ${doc.data().title}`;
        mainContent.innerText = `내용 : 
              ${doc.data().contents}`;
        mainImg.setAttribute('src', `${doc.data().img}`);
      }
    })
    .catch((error) => {
      mainModal.className = 'bg-gray-50 visible container';
      mainTitle.innerText = `에러 발생 : ${error}`;
    });
}
function mainXClick() {
  mainModal.className = 'bg-gray-50 hidden container';
  mainTitle.innerText = ``;
  mainContent.innerText = ``;
  mainModalAbsoulte.className =
    'absolute items-center inset-0 flex justify-center bg-gray-700 bg-opacity-50';
  mainImg.removeAttribute('src');
  document.getElementById(
    'main-comments'
  ).innerHTML = `<span class="text-indigo-600 font-semibold text-lg"
                  >Comments</span
                >
                <div
                  class="flex justify-center border-t border-b py-1"
                  id="no-comments"
                >
                  <div class="-space-x-2 dark:text-gray-400">댓글 없음</div>
                </div>
              </div>`;
  document.getElementById('comment-content').value = '';
}

//coments js
const commentContent = document.getElementById('comment-content');
// comment submit
function submitClick(a) {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      db.collection('Users')
        .doc(`${user.email}`)
        .get()
        .then((nowUser) => {
          if (nowUser.data().photoURL == null) {
            let objects = {
              userId: user.email,
              name: `${nowUser.data().nickname}`,
              photo: noPhoto,
              contents: commentContent.value,
              time: new Date(),
            };
            db.collection('Board')
              .doc(`${a}`)
              .collection('comments')
              .add(objects)
              .then((doc) => {
                alert('댓글 업로드 성공');
                let mainComments = document.getElementById('main-comments');
                let commentsTemplate = document.createElement('div');
                document.getElementById('no-comments').className =
                  'flex hidden justify-center border-t border-b py-1';
                commentsTemplate.innerHTML = `<div class="flex w-full items-center border-t border-b py-1 dark:text-gray-400" 
                    id="${doc.id}">
                      <div class="-space-x-2 mr-2">
                        <img
                          class="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                          src="${objects.photo}"
                          alt=""
                          onerror="this.src='${noPhoto}';"
                        />
                      </div>
                      <span class="w-2/12 mr-2 dark:text-gray-400">${
                        objects.name
                      }</span>
                      <span class="w-6/12 dark:text-gray-400">${
                        objects.contents
                      }</span>
                      <span class="w-4/12 text-right mr-2 dark:text-gray-400">
                        ${objects.time.getFullYear().toString().slice(-2)}/${
                  objects.time.getMonth() + 1
                }/${objects.time.getDate()} ${objects.time.getHours()}:${objects.time.getMinutes()}:${objects.time.getSeconds()}
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-5 h-5 dark:text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        style="cursor: pointer"
                        onclick="commentDelete('${doc.id}', '${a}')"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>`;
                mainComments.append(commentsTemplate);
              })
              .catch(() => {
                alert('댓글 업로드 실패, 올리기 버튼을 다시 눌러주세요.');
              });
            commentContent.value = '';
          } else {
            let objects = {
              userId: user.email,
              name: `${nowUser.data().nickname}`,
              photo: `${nowUser.data().photoURL}`,
              contents: commentContent.value,
              time: new Date(),
            };
            db.collection('Board')
              .doc(`${a}`)
              .collection('comments')
              .add(objects)
              .then((doc) => {
                alert('댓글 업로드 성공');
                let mainComments = document.getElementById('main-comments');
                let commentsTemplate = document.createElement('div');
                document.getElementById('no-comments').className =
                  'flex hidden justify-center border-t border-b py-1';
                commentsTemplate.innerHTML = `<div class="flex w-full items-center border-t border-b py-1 dark:text-gray-400" 
                    id="${doc.id}">
                      <div class="-space-x-2 mr-2">
                        <img
                          class="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                          src="${objects.photo}"
                          alt=""
                          onerror="this.src="${noPhoto}";"
                        />
                      </div>
                      <span class="w-2/12 mr-2 dark:text-gray-400">${
                        objects.name
                      }</span>
                      <span class="w-6/12 dark:text-gray-400">${
                        objects.contents
                      }</span>
                      <span class="w-4/12 text-right mr-2 dark:text-gray-400">
                        ${objects.time.getFullYear().toString().slice(-2)}/${
                  objects.time.getMonth() + 1
                }/${objects.time.getDate()} ${objects.time.getHours()}:${objects.time.getMinutes()}:${objects.time.getSeconds()}
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-5 h-5 dark:text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        style="cursor: pointer"
                        onclick="commentDelete('${doc.id}', '${a}')"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>`;
                mainComments.append(commentsTemplate);
              })
              .catch(() => {
                alert('댓글 업로드 실패, 올리기 버튼을 다시 눌러주세요.');
              });
            commentContent.value = '';
          }
        });
    }
  });
}
//comment delete
function commentDelete(a, b) {
  firebase
    .firestore()
    .collection('Board')
    .doc(`${b}`)
    .collection('comments')
    .doc(`${a}`)
    .delete()
    .then(() => {
      alert('댓글 삭제됨');
      document.getElementById(`${a}`).className =
        'flex w-full items-center justify-center border-t border-b py-1 dark:bg-gray-400';
      document.getElementById(
        `${a}`
      ).innerHTML = `<span>댓글이 삭제되었습니다.</span>`;
    });
}

//로그인 되어있는지 확인 후 프로필 설정, 버튼 재 설정
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    document.getElementById('toast-contents').innerText =
      '상단의 프로필을 클릭해 본인 만의 프로필을 꾸며보세요!';
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
        document.getElementById('comments-nick').innerText = `${
          info.data().nickname
        }`;
        if (info.data().photoURL !== null) {
          document
            .getElementById('profile-img')
            .setAttribute('src', `${info.data().photoURL}`);
          document
            .getElementById('comments-img')
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
      "<div><h1 class='font-semibold mb-2 dark:text-gray-400'>댓글은 로그인후 작성 가능합니다.</h1></div>";
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
