let optionButtons = document.querySelectorAll(".option-button");
let advancedOptionButton = document.querySelectorAll(".adv-option-button");

let fontName = document.getElementById("fontName");
let fontSizeref = document.getElementById("fontSize");
let writingArea = document.getElementById("text-input");
let linkButton = document.getElementById("createLink");
let alignButtons = document.querySelectorAll(".align");
let spacingButtons = document.querySelectorAll(".spacing");
let formatButtons = document.querySelectorAll(".format");
let scriptButton = document.querySelectorAll(".script");

//list of fontlist
let fontList = [
  "Arial",
  "Verdana",
  "Times New Roman",
  "Garamond",
  "Georgia",
  "Courier New",
  "cursive",
];

//Initial Settings
const initializer = () => {
  //function calls for highlighting buttons
  highlighter(alignButtons, true);
  highlighter(spacingButtons, true);
  highlighter(formatButtons, false);
  highlighter(scriptButton, true);

  //create options for font name
  fontList.map(value=>{
    let option=document.createElement("option");
    option.value=value;
    option.innerHTML=value;
    fontName.appendChild(option);
  });

  //fontSize 
  for (let i=1;i<=7;i++){
    let option=document.createElement("option");
    option.value=i;
    option.innerHTML=i;
    fontSizeref.appendChild(option);
  }
  //default size
  fontSizeref.value=3;
};

//main logic 
const modifyText=(command,defaultUi,value)=>{
 document.execCommand(command,defaultUi,value);
}
//For basic operations 
optionButtons.forEach(button=>{
    button.addEventListener("click",()=>{
        modifyText(button.id,false,null);
    })
})
//options require value
advancedOptionButton.forEach((button)=>{
    button.addEventListener("change",()=>{
        modifyText(button.id,false,button.value)
    })
})

//link
linkButton.addEventListener("click",()=>{
    let userLink=prompt("Enter a URL");
    if(/http/i.test(userLink)){
        modifyText(linkButton.id,false,userLink);
    }else{
        userLink="http://"+ userLink;
        modifyText(linkButton.id,false,userLink);
    }
})
//highlight clicked button
const highlighter = (className, needsRemoval) => {
  className.forEach((button) => {
    button.addEventListener("click", () => {
      if (needsRemoval) {
        let alreadyActive = false;
        if (button.classList.contains("active")) {
          alreadyActive = true;
        }
        highlighterRemover(className);
        if (!alreadyActive) {
          button.classList.add("active");
        }
      } else {
        button.classList.toggle("active");
      }
    });
  });
};

const highlighterRemover = (className) => {
  className.forEach((button) => {
     button.classList.remove("active");
  });
};

window.onload = initializer();
