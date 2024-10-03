// Load posts
const loadPosts = async (postsName) => {
    try{
        const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/${postsName}`);
        const data = await res.json();
        // const posts = data.posts;
        // console.log(postsName);

        if(postsName === "posts") {
            displayAllPosts(data.posts);
        } else {
            latestAllPosts(data);
        }
    } catch(error){
        console.error('Error loading posts:', error);
    }
}


// changeColorBoxColor
function changeColorBoxColor(params, isActive) {
    // console.log(params.document.body.children[1].children[0], isActive);

    const colorBox = document.getElementById('color-box');
    console.log(colorBox, isActive);

    if(!isActive) {
        colorBox.classList.replace('bg-green-600', 'bg-red-600');
        // colorBox.classList.remove('bg-green-600');
        // colorBox.classList.add('bg-red-600');
    } 
    else {
        // colorBox.classList.remove('bg-red-600');
        // colorBox.classList.add('bg-green-600');
        colorBox.classList.replace('bg-green-600', 'bg-green-600');
    }
    
    
}

// Display all posts
function displayAllPosts(posts) {
    // console.log(posts);
    
    const postsContainer = document.getElementById('posts-cards-container');
    postsContainer.textContent = '';

    posts.forEach(post => {
        // console.log(post.title, post.view_count);
        
        // const postString = JSON.stringify(post);
        // console.log(postString);
        
        

        const div = document.createElement('div');
        div.classList = `border-2 hover:border-[#797DFC] px-5 py-5 flex flex-row gap-5 rounded-xl bg-[#797DFC1A] transition`;

        div.innerHTML = `
      <!-- Left -->
    <div class="relative h-full">
    <div class="w-14 h-14 rounded-lg bg-white">
        <img class="rounded-lg" src="${post?.image}" alt="" />
    </div>
    <div
    id="color-box"
        class="w-3 h-3 bg-green-600 rounded-full absolute -top-1 -right-1"
    ></div>
    </div>

    <!-- Right -->
    <div class="">
    <div
        class="flex flex-row gap-5 font-bold text-xs text-gray-700"
    >
        <h1># ${post?.category}</h1>
        <h1>Author: ${post?.author?.name}</h1>
    </div>
    <h1 class="font-bold">
        ${post?.title}
    </h1>
    <p class="text-gray-500 py-3 border-b-2 border-dashed border-gray-500 lg:w-[620px]">
        ${post?.description}
    </p>

    <!-- Icons -->
    <div class="flex flex-row justify-between items-center mt-5">
        <div
        class="flex flex-row justify-center items-center gap-3 md:gap-10"
        >
        <div
            class="flex flex-row justify-center items-center gap-2 text-gray-500"
        >
            <i class="fa-regular fa-message"></i>
            <p>${post?.comment_count}</p>
        </div>
        <div
            class="flex flex-row justify-center items-center gap-2 text-gray-500"
        >
            <i class="fa-regular fa-eye"></i>
            <p>${post?.view_count}</p>
        </div>
        <div
            class="flex flex-row justify-center items-center gap-2 text-gray-500"
        >
            <i class="fa-regular fa-clock"></i>
            <p>${post?.posted_time} min</p>
        </div>
        </div>
        <!-- Mail Box -->

        
        <div onclick="selectedPost('${post?.title}', '${post?.view_count}')" class="bg-green-600 rounded-full px-2 py-1 cursor-pointer">
        <i class="fa-regular fa-envelope-open text-white"></i> 
        </div>
    </div>
    </div>
    `;    
    // '${post?.title}', '${post?.view_count}'
    
    postsContainer.appendChild(div);
    loadingSpinner(false)



        // changeColorBoxColor(this, post?.isActive);

        // console.log(post.isActive);

        // const element = document.getElementById('color-box');
        // console.log(element);

        // if(post.isActive) {
        //     element.classList.remove('bg-red-600');
        //     element.classList.add('bg-green-600');
        // } else {
        //     element.classList.remove('bg-green-600');
        //     element.classList.add('bg-red-600');
        // }
        
        // postsContainer.appendChild(div);

        // if(!post.isActive) {
        //     element.classList.remove('bg-green-600');
        //     element.classList.add('bg-red-600');
        // }
        
        // changeBackgroundColor(true);
    });
}



// Function to change the background color based on a condition
function changeBackgroundColor(condition) {
    const element = document.getElementById('colorBox');
    
    if (condition) {
        // Remove the green background class and add the red background class
        element.classList.remove('bg-green-600');
        element.classList.add('bg-red-600');
    } else {
        // Optionally, revert the change if the condition is not met
        element.classList.remove('bg-red-600');
        element.classList.add('bg-green-600');
    }
}


// Selected posts
function selectedPost(postTitle, postView) {
    const selectedItemsContainer = document.getElementById('selected-posts-container');
    
    const div = document.createElement('div');
    div.classList = `flex flex-row md:flex-col lg:flex-row bg-white py-2 px-2 rounded-xl justify-center items-center md:items-start lg:items-center gap-2 mb-3`;

    div.innerHTML = `
        <h1 class="font-bold text-sm md:text-xs lg:text-sm">${postTitle}</h1>
        <div class="flex flex-row justify-center items-center gap-1 text-gray-500">
            <i class="fa-regular fa-eye"></i>
            <p>${postView}</p>
        </div>
    `;

    selectedItemsContainer.appendChild(div);
}



// Latest all posts
function latestAllPosts(posts) {
    
    const latestPostsContainer = document.getElementById('latest-posts-cards-container');
    latestPostsContainer.textContent = '';

    posts.forEach(post => {
        
        const div = document.createElement('div');
        div.classList = `card card-compact bg-base-100 shadow-xl border-t-2`;

        div.innerHTML = `
                    <figure class="px-5 pt-5">
              <img
                class="rounded-xl"
                src="${post?.cover_image}"
                alt="Shoes"
              />
            </figure>
            <div class="p-5 flex flex-col justify-center items-start gap-2">
              <div
                class="flex flex-row gap-3 justify-center items-center text-gray-600 text-lg"
              >
                <i class="fa-regular fa-calendar"></i>
                <p>${post?.author?.posted_date ||'Unknown'}</p>
              </div>

              <h1 class="font-bold text-lg">
                ${post?.title}
              </h1>

              <p class="text-gray-700 line-clamp-2">
                ${post?.description}
              </p>

              <div class="flex flex-row justify-center items-center gap-3">
                <img
                  class="w-14 rounded-full border-2 border-gray-600"
                  src="${post?.profile_image}"
                  alt=""
                />
                <div class="flex flex-col">
                  <h1 class="font-bold text-lg">${post?.author?.name}</h1>
                  <p class="text-base">${post?.author?.designation || 'Unknown'}</p>
                </div>
              </div>
            </div>
        `;

        latestPostsContainer.appendChild(div);
    })
}


// Loading Spinner Functionality
function loadingSpinner(isLoading) {
    const loadingSpinner = document.getElementById('loading-spinner');

    if(isLoading) {
        loadingSpinner.classList.remove('hidden');
    }
    else {
        loadingSpinner.classList.add('hidden');
    }
}


// Load all posts and latest posts
loadPosts('posts');
loadPosts('latest-posts');
