function get_current_user_id() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("userid");
  return id;
}
function toggle_loader(show = true) {
  if (show) {
    document.getElementById("loader").style.visibility = "visible";
  } else {
    document.getElementById("loader").style.visibility = "hidden";
  }
}
setupUI();
get_user();
// get_user
function get_user() {
  const id = get_current_user_id();
  toggle_loader(true)
  axios
    .get(`${baseurl}/users/` + id)
    .then((response) => {
      console.log(response.data.data.name);
      let profile_username = response.data.data.username;
      let profile_image = response.data.data.profile_image;
      let profile_email = response.data.data.email;
      let profile_comments_count = response.data.data.comments_count;
      let profile_post_count = response.data.data.posts_count;
      
      let profile_father = `
        <div class="container  d-flex justify-content-center align-items-center  w-90  p-5  " >
    
        <div class="card post-image shadow">
        <div style="direction: rtl;" class="w-100 p-3  ">
        <div class="  items-container">
            <div class="item_1 d-flex justify-content-center">
                <img src="${profile_image}" alt=""  style="height: 80px; width:80px; border: solid gray 1px; border-radius: 100%;"  
                id="picture">            
            </div>
        <div class="item_2" style="text-align: center ; ">
            <p style=" font-weight: bold; font-size: 1rem " id="user_name"> ${profile_username}</p>
            <p style="font-weight: bold; font-size: 1rem ; color: gray" id="user_name">${profile_email}</p>
        </div>
        <div class="item_3" >
            <p style="   font-size:1.5rem ; font-weight: bold;" id="user_name"> ${profile_comments_count}</p>
            <p style="   font-weight: bold; font-size: 1rem ; color: gray ;margin-top :-15px;" id="user_name">comments</p>
        </div>
        <div class="item_4" >
            <p style="   font-size: 1.5rem ;font-weight: bold;" id="user_name"> ${profile_post_count}</p>
            <p style="  font-weight: bold; font-size: 1rem ; color: gray ;margin-top :-15px; " id="user_name">posts</p>

        </div>
        </div>
    </div>
    
    </div>
    
    
    </div>
    </div>
   `;
      document.getElementById("profile_father").innerHTML = profile_father;
    }).finally(function () {
      toggle_loader(false)    });
  
}

GETPOST();
// GETPOST
function GETPOST() {
  const id = get_current_user_id();
  ;
  toggle_loader(true) 
  axios
    .get(baseurl + `/users/${id}/posts`)
    .then(function (response) {
      console.log(response.data.data);

      posts = response.data.data;
      for (p of posts) {
        username = p.author.username;
        picture = p.author.profile_image;
        post_content = p.body;
        time = p.created_at;

        title = "";

        //     let user = get_currnet_user()

        //     let isMyPost = user != null && p.author.id == user.id
        //     let EditbuttonContent =``;
        //    let DeletebuttonContent = ``;

        //            alert(isMyPost)
        //            if(isMyPost){
        //               // <i class="fa-regular fa-square-minus"></i>
        //               EditbuttonContent = ` <button class=" rounded-5 edit-btn" ;id="picture"><i class="fa-solid fa-pen-nib" onclick="edit_btn('${encodeURIComponent(JSON.stringify(post))}')"></i></button>`;
        //               DeletebuttonContent = ` <button class=" rounded-5 delete-btn" ;id="picture bg-danger"><i class="fa-regular fa-square-minus"onclick="delete_btn('${encodeURIComponent(JSON.stringify(post))}')" ></i></button>`;
        //            }

        if (p.title != null) {
          title = p.title;
        }
        comments_count = p.comments_count;
        image = p.image;

        let user_posts = `
  <div class="container  d-flex justify-content-center align-items-center  w-90  p-5 " >
  
  <div class="card post-image shadow">
  <div style="margin-bottom: 50px;margin-top: 16px; padding-right: 24px;direction: rtl;" class="w-100 ">
  <div class="d-flex align-items-center ">
  <img src=${picture} alt="" class="pico rounded-5"
  
  style="height: 50px; width:50px;margin-bottom: 20px; border: solid gray 1px;" class="rounded-5" ;
  id="picture">
  <hr>
  
  <p style="margin-right: 15px;font-weight: bold; " id="user_name"> ${username}</p>
  </div>
  <p style="margin: 0 4px 0 4px;" id="post_content">
  ${post_content}</p>
  </div>
  <div class=" post-image-cont w-100 h-100"  id="image bg-danger">
  <img src="${image}" class=" post-image w-100 h-100" alt="user Not use a  available  image" id="image" onclick="postClicked(${p.id}) ">
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

        document.getElementById("user_posts").innerHTML += user_posts;
        let id = `hashtag${p.id}`;
        document.getElementById(id).innerHTML = " ";

        for (tag of p.tags) {
          let teacont = `<p>${tag.name}</p>`;
          document.getElementById(id).style.display = "inline-block";
          document.getElementById(id).innerHTML += teacont;
        }
      }
    })
    .catch(function (error) {
      error = " hello world "
      console.log(error);
    })
    .finally(function () {
      toggle_loader(false)    });
}
