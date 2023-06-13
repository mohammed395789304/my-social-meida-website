const baseurl = "https://tarmeezacademy.com/api/v1";
let currentpage = 1;
let lastpage = 1;
setupUI();
appearname();

// GETPOST
function GETPOST(reload = true, page = `1`) {
  let father = document.getElementById("father");

  if (father != null) {
    let father = document.getElementById("father");

    axios
      .get(baseurl + `/posts?limit=5&page=${page}`)
      .then(function (response) {
        lastpage = response.data.meta.last_page;
        if (reload) {
          document.getElementById("father").innerHTML = "";
        }
        posts = response.data.data;
        for (p of posts) {
          username = p.author.username;
          picture = p.author.profile_image;
          post_content = p.body;
          time = p.created_at;
          title = "";
          if (p.title != null) {
            title = p.title;
          }
          comments_count = p.comments_count;
          image = p.image;
          let content = `
          <div class="container  d-flex justify-content-center align-items-center  w-90  p-5 " >
          
          <div class="card post-image shadow">
          <div style="margin-bottom: 50px;margin-top: 16px; padding-right: 24px;direction: rtl;" class="w-100 ">
          <div class="d-flex align-items-center pointer" onclick="UserClicked(${user_id}) " >
          <img src=${picture} alt="" class="pico rounded-5"
          style="height: 50px; width:50px;margin-bottom: 20px; border: solid gray 1px;" class="rounded-5" ;
          id="picture">
          <p style="margin-right: 15px;font-weight: bold; " id="user_name"> ${username}</p>
          </div>
          <p style="margin: 0 4px 0 4px;" id="post_content">
          ${post_content}</p>
          </div>
          <div class=" post-image-cont w-100 h-100"  id="image bg-danger">
          <img src="${image}" class=" post-image w-100 h-100" alt="user Not use a  available  image" id="image">
          </div>
          <div class="card-body ">
          <h6 style="color: gray;" id="time">${time}</h6>
          <h5 id="title">${title}</h5>
          <hr>
          <div>
          <p>  <i class="fa-solid fa-pen-to-square"></i>(<span id="comments_count">${comments_count}</span>) comments</p> 
          <span id="hashtag${p.id}"></span>
          </div>
          </div>
          </div>
          </div>
          </div>`;

          document.getElementById("father").innerHTML += content;
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }
}
// Sign_Up
function Sign_Up() {
  let UserName = document.getElementById("username-input2").value;
  // username  input
  let PassWord = document.getElementById("Passowrd-input2").value;
  // password input
  let name = document.getElementById("name-input2").value;
  // name input
  let profile_image = document.getElementById("Photo").files[0];
  //  the photo of  user

  // const params = {
  //   username: UserName,
  //   password: PassWord,
  //   name: name,
  //   profile_image: profile_image,
  // };

  let formData = new FormData();
  formData.append("username", UserName);
  formData.append("password", PassWord);
  formData.append("name", name);
  formData.append("image", profile_image);

  const url = baseurl + "/register";

  axios
    .post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data ",
      },
    })
    .then((response) => {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      const modal = document.getElementById("SignUpModal");
      const modalinstance = bootstrap.Modal.getInstance(modal);
      modalinstance.hide();
      show_alert_messge3();
      setupUI();
    })
    .catch((error) => {
      const message = error.response.data.message;
      show_alert_messge4(message, "");
      setupUI();
    });
  console.log(UserName, PassWord);
}
// Login
function Login() {
  let UserName = document.getElementById("username-input").value;
  let PassWord = document.getElementById("Passowrd-input").value;

  const params = {
    username: UserName,
    password: PassWord,
  };
  const url = baseurl + "/login";

  axios.post(url, params).then((response) => {
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));
    console.log(response.data);
    const modal = document.getElementById("LoginModal");
    const modalinstance = bootstrap.Modal.getInstance(modal);
    modalinstance.hide();

    show_alert_messge4(UserName + "  Logged In Successfully", "");
    setupUI();
  });
  console.log(UserName, PassWord);
}

setupUI();
// show_alert_messge4
function show_alert_messge4(message, type) {
  const alertPlaceholder = document.getElementById("success-alert");
  const appendAlert = (message, type) => {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = [
      `<div class="alert alert-${type} alert-dismissible" role="alert">`,
      `   <div>${message}</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      "</div>",
    ].join("");

    alertPlaceholder.append(wrapper);
  };

  appendAlert(message, type);

  setTimeout(() => {
    alertPlaceholder.style.display = "none";
  }, 3000);
}
// show_alert_messge3 to edit
function show_alert_messge3() {
  const alertPlaceholder = document.getElementById("success-alert");
  const appendAlert = (message, type) => {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = [
      `<div class="alert alert-${type} alert-dismissible" role="alert">`,
      `   <div>${message}</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      "</div>",
    ].join("");

    alertPlaceholder.append(wrapper);
  };

  let UserName = document.getElementById("username-input2").value;

  appendAlert("Welcome  " + UserName + "  You are Successfully Sign Up");

  setTimeout(() => {
    alertPlaceholder.style.display = "none";
  }, 3000);
}
// show_alert_messge_2 to edit
function show_alert_messge_2() {
  const alertPlaceholder = document.getElementById("success-not-alert");
  const appendAlert = (message, type) => {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = [
      `<div class="alert alert-${type} alert-dismissible" role="alert">`,
      `   <div>${message}</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      "</div>",
    ].join("");

    alertPlaceholder.append(wrapper);
  };

  let UserName = document.getElementById("username-input").value;

  appendAlert("Welcome  " + UserName + "  You are successfully logged Out ");

  setTimeout(() => {
    alertPlaceholder.style.display = "none";
  }, 3000);
}
// setupUI
setupUI()
function setupUI() {
  const token = localStorage.getItem("token");
  const loginbtn = document.getElementById("Login-btn");
  const LogOutbtn = document.getElementById("LogOut-btn");
  const SignUpbtn = document.getElementById("Sign Up-btn");
  const AddBtn = document.getElementById("AddBtn");
  const user = get_currnet_user();
  let deta = document.getElementById("post_details")
  let comment_text = document.getElementById("comment_text")
  if (token != null) {
    loginbtn.style.display = "none";
    SignUpbtn.style.display = "none";
    LogOutbtn.style.display = "inline-block";
    if(comment_text != null){
      comment_text.style.display= "inline-block"
    }
    
    console.log(user);
 

    if (AddBtn != null) {
      AddBtn.style.display = "block";
    }//

    document.getElementById("nav_user_name").innerHTML = user.username;
    if (user.profile_image != null) {
      document.getElementById("picture").src = user.profile_image;
    }//
  } else {
    if (AddBtn != null) {
      AddBtn.style.display = "none";
    }//
    loginbtn.style.display = "inline-block";
    SignUpbtn.style.display = "inline-block";
    LogOutbtn.style.display = "none";
    document.querySelector("#nav_user_name").innerHTML = "";
    document.getElementById("picture").src = "";
    if(comment_text != null){
      comment_text.style.display= "none"
    }
  }
}
// LogOut
function LogOut() {
  localStorage.removeItem("token");

  localStorage.removeItem("user");

  show_alert_messge_2();
  setupUI();
}
// AddNewPost

// function AddNewPost() {
//   let postid =  document.getElementById("post_id_input").value;
//   alert(postid)
//   const title = document.getElementById("Title-name").value;
//   const body = document.getElementById("Content-text").value;
//   const image = document.getElementById("Image-text").files[0];
//   let token = localStorage.getItem("token");

//   let formData = new FormData();
//   formData.append("body", body);
//   formData.append("title", title);
//   formData.append("image", image);

//   const url = baseurl + "/posts";

//   axios
//     .post(url, formData, {
//       headers: {
//         "Content-Type": "multipart/form-data ",
//         authorization: `Bearer ${token}`,
//       },
//     })

//     .then((response) => {
//       const modal = document.getElementById("AddBtnModal");
//       const modalinstance = bootstrap.Modal.getInstance(modal);
//       modalinstance.hide();
//       show_alert_messge4("New Post Has Been Created", "");
//       location.reload();
//     })

//     .catch((error) => {
//       error.response.data.message;
//       show_alert_messge4(error, "danger");
//     });
// }
// name trick
function appearname() {
  document
    .querySelector(
      "#navbarSupportedContent > ul:nth-child(2) > li:nth-child(3) > a"
    )
    .addEventListener("mouseover", function () {
      document.querySelector("#picture").style.display = "inline-block";
      setTimeout(() => {
        document.querySelector("#picture").style.display = "none";
      }, 8000);
    });
  setupUI();
}
// get_currnet_user
function get_currnet_user() {
  let user = null;
  const storageuser = localStorage.getItem("user");
  if (storageuser != null) {
    user = JSON.parse(storageuser);
  }

  return user;
}

// infinte scrolling
window.addEventListener("scroll", () => {
  const endOfPage =
    window.innerHeight + window.pageYOffset >= document.body.offsetHeight;
  if (endOfPage && currentpage < lastpage) {
    console.log(currentpage, lastpage);
    currentpage = currentpage + 1;
    GETPOST(false, currentpage + 1);
  }
});
// infinte scrolling end









































































// copy
// const baseurl = "https://tarmeezacademy.com/api/v1";
// let currentpage = 1;
// let lastpage = 1;
// setupUI();
// appearname();

// // GETPOST
// function GETPOST(reload = true, page = `1`) {
//   let father = document.getElementById("father");

//   if (father != null) {
//     let father = document.getElementById("father");

//     axios
//       .get(baseurl + `/posts?limit=5&page=${page}`)
//       .then(function (response) {
//         lastpage = response.data.meta.last_page;
//         if (reload) {
//           document.getElementById("father").innerHTML = "";
//         }
//         posts = response.data.data;
//         for (p of posts) {
//           username = p.author.username;
//           picture = p.author.profile_image;
//           post_content = p.body;
//           time = p.created_at;
//           title = "";
//           if (p.title != null) {
//             title = p.title;
//           }
//           comments_count = p.comments_count;
//           image = p.image;
//           let content = `
//           <div class="container  d-flex justify-content-center align-items-center  w-90  p-5 " >
          
//           <div class="card post-image shadow">
//           <div style="margin-bottom: 50px;margin-top: 16px; padding-right: 24px;direction: rtl;" class="w-100 ">
//           <div class="d-flex align-items-center ">
//           <img src=${picture} alt="" class="pico rounded-5"
//           style="height: 50px; width:50px;margin-bottom: 20px; border: solid gray 1px;" class="rounded-5" ;
//           id="picture">
//           <p style="margin-right: 15px;font-weight: bold; " id="user_name"> ${username}</p>
//           </div>
//           <p style="margin: 0 4px 0 4px;" id="post_content">
//           ${post_content}</p>
//           </div>
//           <div class=" post-image-cont w-100 h-100"  id="image bg-danger">
//           <img src="${image}" class=" post-image w-100 h-100" alt="user Not use a  available  image" id="image">
//           </div>
//           <div class="card-body ">
//           <h6 style="color: gray;" id="time">${time}</h6>
//           <h5 id="title">${title}</h5>
//           <hr>
//           <div>
//           <p>  <i class="fa-solid fa-pen-to-square"></i>(<span id="comments_count">${comments_count}</span>) comments</p> 
//           <span id="hashtag${p.id}"></span>
//           </div>
//           </div>
//           </div>
//           </div>
//           </div>`;

//           document.getElementById("father").innerHTML += content;
//         }
//       })
//       .catch(function (error) {
//         // handle error
//         console.log(error);
//       })
//       .finally(function () {
//         // always executed
//       });
//   }
// }
// // Sign_Up
// function Sign_Up() {
//   let UserName = document.getElementById("username-input2").value;
//   // username  input
//   let PassWord = document.getElementById("Passowrd-input2").value;
//   // password input
//   let name = document.getElementById("name-input2").value;
//   // name input
//   let profile_image = document.getElementById("Photo").files[0];
//   //  the photo of  user

//   // const params = {
//   //   username: UserName,
//   //   password: PassWord,
//   //   name: name,
//   //   profile_image: profile_image,
//   // };

//   let formData = new FormData();
//   formData.append("username", UserName);
//   formData.append("password", PassWord);
//   formData.append("name", name);
//   formData.append("image", profile_image);

//   const url = baseurl + "/register";

//   axios
//     .post(url, formData, {
//       headers: {
//         "Content-Type": "multipart/form-data ",
//       },
//     })
//     .then((response) => {
//       localStorage.setItem("token", response.data.token);
//       localStorage.setItem("user", JSON.stringify(response.data.user));
//       const modal = document.getElementById("SignUpModal");
//       const modalinstance = bootstrap.Modal.getInstance(modal);
//       modalinstance.hide();
//       show_alert_messge3();
//       setupUI();
//     })
//     .catch((error) => {
//       const message = error.response.data.message;
//       show_alert_messge4(message, "");
//       setupUI();
//     });
//   console.log(UserName, PassWord);
// }
// // Login
// function Login() {
//   let UserName = document.getElementById("username-input").value;
//   let PassWord = document.getElementById("Passowrd-input").value;

//   const params = {
//     username: UserName,
//     password: PassWord,
//   };
//   const url = baseurl + "/login";

//   axios.post(url, params).then((response) => {
//     localStorage.setItem("token", response.data.token);
//     localStorage.setItem("user", JSON.stringify(response.data.user));
//     console.log(response.data);
//     const modal = document.getElementById("LoginModal");
//     const modalinstance = bootstrap.Modal.getInstance(modal);
//     modalinstance.hide();

//     show_alert_messge4(UserName + "  Logged In Successfully", "");
//     setupUI();
//   });
//   console.log(UserName, PassWord);
// }

// setupUI();
// // show_alert_messge4
// function show_alert_messge4(message, type) {
//   const alertPlaceholder = document.getElementById("success-alert");
//   const appendAlert = (message, type) => {
//     const wrapper = document.createElement("div");
//     wrapper.innerHTML = [
//       `<div class="alert alert-${type} alert-dismissible" role="alert">`,
//       `   <div>${message}</div>`,
//       '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
//       "</div>",
//     ].join("");

//     alertPlaceholder.append(wrapper);
//   };

//   appendAlert(message, type);

//   setTimeout(() => {
//     alertPlaceholder.style.display = "none";
//   }, 3000);
// }
// // show_alert_messge3 to edit
// function show_alert_messge3() {
//   const alertPlaceholder = document.getElementById("success-alert");
//   const appendAlert = (message, type) => {
//     const wrapper = document.createElement("div");
//     wrapper.innerHTML = [
//       `<div class="alert alert-${type} alert-dismissible" role="alert">`,
//       `   <div>${message}</div>`,
//       '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
//       "</div>",
//     ].join("");

//     alertPlaceholder.append(wrapper);
//   };

//   let UserName = document.getElementById("username-input2").value;

//   appendAlert("Welcome  " + UserName + "  You are Successfully Sign Up");

//   setTimeout(() => {
//     alertPlaceholder.style.display = "none";
//   }, 3000);
// }
// // show_alert_messge_2 to edit
// function show_alert_messge_2() {
//   const alertPlaceholder = document.getElementById("success-not-alert");
//   const appendAlert = (message, type) => {
//     const wrapper = document.createElement("div");
//     wrapper.innerHTML = [
//       `<div class="alert alert-${type} alert-dismissible" role="alert">`,
//       `   <div>${message}</div>`,
//       '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
//       "</div>",
//     ].join("");

//     alertPlaceholder.append(wrapper);
//   };

//   let UserName = document.getElementById("username-input").value;

//   appendAlert("Welcome  " + UserName + "  You are successfully logged Out ");

//   setTimeout(() => {
//     alertPlaceholder.style.display = "none";
//   }, 3000);
// }
// // setupUI
// function setupUI() {
//   const token = localStorage.getItem("token");
//   const loginbtn = document.getElementById("Login-btn");
//   const LogOutbtn = document.getElementById("LogOut-btn");
//   const SignUpbtn = document.getElementById("Sign Up-btn");
//   const AddBtn = document.getElementById("AddBtn");
//   const user = get_currnet_user();
//   let deta = document.getElementById("post_details")
//   let post_details = `<p class="picow large ">${user.username} </p>`;

//   if (token != null) {
//     loginbtn.style.display = "none";
//     SignUpbtn.style.display = "none";
//     LogOutbtn.style.display = "inline-block";

//     console.log(user);
//     if (deta != null) {
//       document.getElementById("post_details").innerHTML = post_details;
//     }//

//     if (AddBtn != null) {
//       AddBtn.style.display = "block";
//     }//

//     document.getElementById("nav_user_name").innerHTML = user.username;
//     if (user.profile_image != null) {
//       document.getElementById("picture").src = user.profile_image;
//     }//
//   } else {
//     if (AddBtn != null) {
//       AddBtn.style.display = "none";
//     }//
//     loginbtn.style.display = "inline-block";
//     SignUpbtn.style.display = "inline-block";
//     LogOutbtn.style.display = "none";
//     document.querySelector("#nav_user_name").innerHTML = "";
//     document.getElementById("picture").src = "";
//     if (deta != null) {
//       document.getElementById("post_details").innerHTML = "";
//     }//
//   }
// }
// // LogOut
// function LogOut() {
//   localStorage.removeItem("token");

//   localStorage.removeItem("user");

//   show_alert_messge_2();
//   setupUI();
// }
// // AddNewPost
// function AddNewPost() {
//   const title = document.getElementById("Title-name").value;
//   const body = document.getElementById("Content-text").value;
//   const image = document.getElementById("Image-text").files[0];
//   let token = localStorage.getItem("token");

//   let formData = new FormData();
//   formData.append("body", body);
//   formData.append("title", title);
//   formData.append("image", image);

//   const url = baseurl + "/posts";

//   axios
//     .post(url, formData, {
//       headers: {
//         "Content-Type": "multipart/form-data ",
//         authorization: `Bearer ${token}`,
//       },
//     })

//     .then((response) => {
//       const modal = document.getElementById("AddBtnModal");
//       const modalinstance = bootstrap.Modal.getInstance(modal);
//       modalinstance.hide();
//       show_alert_messge4("New Post Has Been Created", "");
//       location.reload();
//     })

//     .catch((error) => {
//       error.response.data.message;
//       show_alert_messge4(error, "danger");
//     });
// }
// // name trick
// function appearname() {
//   document
//     .querySelector(
//       "#navbarSupportedContent > ul:nth-child(2) > li:nth-child(3) > a"
//     )
//     .addEventListener("mouseover", function () {
//       document.querySelector("#picture").style.display = "inline-block";
//       setTimeout(() => {
//         document.querySelector("#picture").style.display = "none";
//       }, 8000);
//     });
//   setupUI();
// }
// // get_currnet_user
// function get_currnet_user() {
//   let user = null;
//   const storageuser = localStorage.getItem("user");
//   if (storageuser != null) {
//     user = JSON.parse(storageuser);
//   }

//   return user;
// }

// // infinte scrolling
// window.addEventListener("scroll", () => {
//   const endOfPage =
//     window.innerHeight + window.pageYOffset >= document.body.offsetHeight;
//   if (endOfPage && currentpage < lastpage) {
//     console.log(currentpage, lastpage);
//     currentpage = currentpage + 1;
//     GETPOST(false, currentpage + 1);
//   }
// });
// // infinte scrolling end
