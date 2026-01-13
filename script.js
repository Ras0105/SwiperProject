let swiperInstance;

document.getElementById("generateBtn").addEventListener("click", () => {
  const input = document.getElementById("imageInput");
  const wrapper = document.getElementById("swiperWrapper");

  wrapper.innerHTML = ""; // reset old slides

  Array.from(input.files).forEach(file => {
    const slide = document.createElement("div");
    slide.className = "swiper-slide";

    const img = document.createElement("img");
    img.src = URL.createObjectURL(file);

    slide.appendChild(img);
    wrapper.appendChild(slide);
  });

  // destroy old swiper if exists
  if (swiperInstance) swiperInstance.destroy(true, true);

  swiperInstance = new Swiper(".swiper", {
    loop: true,
    pagination: { el: ".swiper-pagination" },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    }
  });
});


/*Code Explanation
1. let swiperInstance;
hamlog ek variable define kiye hain, swiperInstance naam ka , isme ham Swiper ka object store karenge
this is used so that when new slider is created then we can delete the older one cleanly.
isko click event ke bahar declare iss liye kar rahe hain because, ye purane swiper ka reference rakhta hai,
taaki ham purane ko delete kar sake aur naya store kar sake.

2. document.getElementById("generateBtn").addEventListener("click", () => {
    HTML se Generate Slider button ko select karta hai aur jab button click karte hain tab following event call hota hai

3. const input = document.getElementById("imageInput");
    input naam ke variable me imageInput naam ki id (input foeld wali) ko select kar rahe hain
    NOTE- <input type="file" id="imageInput" multiple> iske andar user ki selected images hoti hain

4. const wrapper = document.getElementById("swiperWrapper");
    wrapper naam ke variable(const type) me ham swiperWrapper naam ki ID ko store kar rahe hain,
    aur ye wahi container hai jisme slides add hongi.

5. wrapper.innerHTML = "";
    wrapper div me pehle kuch store nahi karenge, to ye purani slides ko remove karta hai.(input se pehle wali)
    this is done so that when user uploads new images, then old ones don't get repeated.

6. Array.from(input.files)
    input variable ( jo ki sab data, images store karta hai), wahan se user ki input images ko select karta hai
    Array.from() usko array bana deta hai,
    matlab jo images hain input wali, unko vo array bana deta hai.

7. .forEach(file => {
    jo user ki images hain, ye uss array pe loop karta hai, aur one by one har image ko visit karta hai

8. const slide = document.createElement("div");
    ye ek naya div banata hai, ye ek swiper slide hoga

9. slide.className = "swiper-slide";
    as per the rules of swiper, each slide should have class swiper-slide

10. const img = document.createElement("img");
    image tag dynamically create kar rahe hain, to show user image.

11. img.src = URL.createObjectURL(file);
    most important line, this creates temporary url of user's image, no need to upload to the server.
    we can say that browser says, iss local file ko webpage pe dikha do.

12. slide.appendChild(img);
    isse img tag, johamne abhi banaya hai (img variable me stored hai) usko slide me daal deta hai
    slide wahi div hai jo hamne abhi banaya tha img ke pehle.

    <div class="swiper-slide">
        <img src="blob:...">
            </div>

    kuch aisa ban jata hai.

13. wrapper.appendChild(slide);
    ab slide ko swiper wrapper ke andar daal deta hai, as
    <div class="swiper-wrapper">
        <!-- slides here -->
    </div>

14. });
    this marks the closure of for each loop, i.e. the loop over the user's images array is now ended.

15. if (swiperInstance)
    this checks if swiperInstance, that we created at very start
    checks that kya swiper pehle se exist karta hai?
    if yes, then we have to destroy it.
    It removes the old swiper completely, on refreshing, local storage me kuch bhi save nahi ho raha hai.

16. swiperInstance = new Swiper(".swiper", {
    here we are creating new swiper, slider; .slider is the main container.

17. loop: true,
    last slide ke baad first slide aa jaate hai, thisensures the the slider is infinite

18. pagination: { el: ".swiper-pagination" },
    this is used to show dots( for pages) in the end

19. navigation: {
  nextEl: ".swiper-button-next",
  prevEl: ".swiper-button-prev"
}
    this is used for right and left (default) style buttons of swiper.js

20. });
});
    these lines mark the end of swiper config and the whole click event.

SUMMARY:
this code takes user-uploaded images, 
dynamically creates Swiper slides using JS, 
and initializes Swiper only after the DOM is updated.
It also safely destroys any existing Swiper instance to avoid duplication.

🧠 MORAL OF THE STORY
Button ke andar ka code kaam karta hai,
button ke bahar ka variable yaad rakhta hai.
*/