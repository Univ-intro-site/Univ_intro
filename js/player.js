window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

const player = document.querySelector("#player");
const npcList = document.querySelectorAll(".npc");
// const talk1 = document.querySelector("#talk1");
// const talk2 = document.querySelector("#talk2");
// const talk3 = document.querySelector("#talk3");
const talk = document.querySelectorAll(".talk");
const overlay = document.querySelectorAll(".talk__overlay");
const nextBtn = document.querySelectorAll(".nextBtn");
const talkNpc = document.querySelectorAll(".talk__npc");
const cat = document.querySelectorAll(".cat");
const talkNpcName = document.querySelectorAll(".talk__npc>h3");
const talkPlayer = document.querySelectorAll(".talk__player");
const talkWrap = document.querySelectorAll(".talk__char"); // 대사 player일때 오른쪽 정렬하기 위해 씀
const talkScript = document.querySelectorAll(".talk__script"); // 대사
const talkChar = document.querySelectorAll(".talk__char-wrap"); // 이미지 + 이름

//link 선언 // link css ===========================
const ground = document.querySelector(".ground");
const groundheader = document.querySelector(".groundheader");
const groundbody = document.querySelector(".groundbody");



const dialogList = {
  0: {
    name: "미대생",
    script: [
      "안녕? 거기서 뭐하니",
      "여기는 뭐하는데야?",
      "여기는 대학본부이야~",
      "그렇구나!",
      "https://www.wku.ac.kr/about/institutions/offices.html",
    ],
    img: "../img/대학본부.png",
  },
  1: {
    name: "인문대생",
    script: [
      "못보던 고양이네?",
      "대학 구경 왔어",
      "여기는 학생회관이야~ 1층엔 뭐가있고 2층엔 ~",
      "고마워!",
      "https://www.youtube.com/watch?v=UKAspu8Lz_k",
    ],
    img: "../img/학생회관.png",
  },
  2: {
    name: "공대생",
    script: [
      "끄어어...",
      "왜그래??",
      "여기는 프라임관이야 창의공과대학이 모여있어.",
      "그렇구나! 힘내!",
      "https://www.youtube.com/watch?v=F2b7d18Sl4Y",
    ],
    img: "../img/프라임관.png",
  },
  3: {
    name: "자연대생",
    script: [
      "넌 열성유전자를 갖고있군",
      "뭐라는거야",
      "아! 오늘 유전자에 대해 배웠거든 ㅎㅎ 난 휴식하러 수덕호에 왔어~",
      "물 색깔이 정말 푸르다!",
      "https://www.youtube.com/watch?v=2_j5GXY7624",
    ],
    img: "../img/수덕호.png",
  },
  4: {
    name: "교수님",
    script: [
      "엣헴",
      "엇.. 교수님?!",
      "여기는 학생지원관이다.",
      "그렇군요",
      "https://www.youtube.com/watch?v=ZqWBvbJJrbo"
    ],
    img: "../img/학생지원관.png",
  },
  5: {
    name: "의대생",
    script: [
      "어쩌구저쩌구(공부중)",
      "앗.. 여기는 딱봐도 중앙도서관이군..",
      "어쩌구저쩌구(공부중)",
      "오...",
      "https://elibrary.wku.ac.kr/lib/SlimaPlus.csp#link",
    ],
    img: "../img/중앙도서관.jpg",
  },
};

let npcIndex = 0;

// 클릭한 npc 인식 및 그 npc로 대사 설정, 대화창 띄움
npcList.forEach((npc, index) => {
  npc.addEventListener("click", () => {
    dialog = dialogList[index]; // 추후 close에서 수정해야하나? 근데 실행할때마다 해서 상관업을 것 같기도
    // console.dir(dialog);
    npcIndex = index;
    openTalk(npcIndex);
  });
});
let dialog = {};

// hidden을 없애면서 대화창 띄움. 띄워야지 nextBtn click event를 인식함
const openTalk = (npcIndex) => {
  talkPlayer[npcIndex].classList.remove("hidden");
  talkNpc[npcIndex].classList.add("hidden");
  talkWrap[npcIndex].classList.add("talk__char--right");
  talk[npcIndex].classList.remove("hidden");
  cat[npcIndex].classList.remove("hidden");
  player.classList.add("hidden");
  nextBtn[npcIndex].addEventListener("click", nextTalk);
  talkNpcName[npcIndex].textContent = dialog.name; // 클릭한 npc 이름 설정
  //overlay[npcIndex].addEventListener("click", closeTalk);
};
let talkIndex = 0;

// nextBtn을 누르면 대화 내용 다음꺼로 변경, 마지막 대화 넘으면 closeTalk 실행(대화창 끔)
const nextTalk = () => {
  if (talkIndex % 2 == 0) {
    // 짝수일때 player 보임
    talkPlayer[npcIndex].classList.add("hidden");
    talkNpc[npcIndex].classList.remove("hidden");
    talkWrap[npcIndex].classList.remove("talk__char--right");
  } else {
    // 홀수일때 npc 보임
    talkPlayer[npcIndex].classList.remove("hidden");
    talkWrap[npcIndex].classList.add("talk__char--right");
    talkNpc[npcIndex].classList.add("hidden");
  }
  talkScript[npcIndex].textContent = dialog.script[talkIndex];
  talkIndex++;

 
  if (talkIndex === dialog.script.length-1) {
    talkScript[npcIndex].textContent = "안녕! 다시 물어보러왔어!";
    console.dir(groundheader);
    groundheader.href=dialogList[npcIndex].script[talkIndex];
    groundheader.style.backgroundImage=`url(${dialogList[npcIndex].img})`;
    talkIndex = 0;
    closeTalk();
  }
};
// 대화창 끔
const closeTalk = () => {
  talk[npcIndex].classList.add("hidden");
  cat[npcIndex].classList.add("hidden");
  player.classList.remove("hidden");
  ground.classList.remove("hidden");
};

const clicklink = () => {
  ground.classList.add("hidden");
}
ground.addEventListener("click",clicklink)