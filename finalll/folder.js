const realFileBtn = document.getElementById("real-file");
const customBtn = document.getElementById("custom-button");
const customTxt = document.getElementById("custom-text");

// customBtn.addEventListener("click", function() {
//   realFileBtn.click();
// });

// $(document).ready(function () {
//   $(".popUpBtn").on("click", function () {
//     $("#" + $(this).data("modal")).css("display", "block");
//   });

//   $("span.close").on("click", function () {
//     $(".modal").css("display", "none");
//   });

//   $(window).on("click", function (event) {
//     if (jQuery.inArray(event.target, $(".modal")) != "-1") {
//       $(".modal").css("display", "none");
//     }
//   });
// });

// Get the modal
// var modal = document.getElementById('myModal');

// Get the button that opens the modal
// var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
// btn.onclick = function() {
//     modal.style.display = "block";
// }

// When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//     modal.style.display = "none";
// }

// When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//     if (event.target == modal) {
//         modal.style.display = "none";
//     }
// }

// $(document).ready(function () {
//   $(".popUpBtn").on("click", function () {
//     $("#" + $(this).data("modal")).css("display", "block");
//   });

//   $("span.close").on("click", function () {
//     $(".modal").css("display", "none");
//   });

//   $(window).on("click", function (event) {
//     if (jQuery.inArray(event.target, $(".modal")) != "-1") {
//       $(".modal").css("display", "none");
//     }
//   });
// });

function displayModal()
{
  document.getElementById("folder").click();
};

function displayfileModal()
{
  document.getElementById("real-file").click();
};

// event triggers

const name = document.getElementById('')