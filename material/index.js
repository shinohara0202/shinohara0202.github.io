

//規約セット呼び出し
function dispTermset(corpoId, scrId) {
  const setUrl = `https://termhub.jp/term-sets/${corpoId}/${scrId}.json`;

  const xhr = new XMLHttpRequest();
  xhr.open("GET", setUrl);
  xhr.responseType = "json";
  xhr.send();

  xhr.onload = function () {
    callSet = xhr.response;
    //ここに各種funcitonを書いておく

    if (location.pathname.includes("index01")) {
      vertical_set(callSet);
    } else if (location.pathname.includes("index02")) {
      side_set(callSet);
    } else if (location.pathname.includes("index03")) {
      frame_set(callSet);
    } else if (location.pathname.includes("index04")) {
      pull_set(callSet);
    } else if (location.pathname.includes("index05")) {
      pop_set(callSet);
    }


    //verticalset
    function vertical_set(callSet) {
      const result = callSet.result.term_list;
      const termArea1 = document.querySelector("#vertical-js");

      for (let i = 0; i < result.length; i++) {
        const a = document.createElement("a");
        const li = document.createElement("li");

        if (result[i].term_url === null) {
          a.href = `terms.html?term_id=${result[i].term_id}`;
          li.textContent = result[i].title

          a.append(li);

        } else {
          a.href = result[i].term_url;
          li.textContent = result[i].title

          a.append(li);
        }

        termArea1.append(a);

      }

    }

    //sideset
    function side_set(callSet) {
      const termArea = document.querySelector("#side-js");
      termArea.style.display = "inline-block";

      for (let i = 0; i < callSet.result.term_list.length; i++) {
        const span = document.createElement("span")
        const a = document.createElement("a");

        span.textContent = "　";
        a.href = `terms.html?term_id=${callSet.result.term_list[i].term_id}`;
        a.textContent = callSet.result.term_list[i].title;

        span.append(a);
        termArea.append(span);
      }

    }

  }

  //frameset
  function frame_set(callSet) {
    for (let i = 0; i < callSet.result.term_list.length; i++) {
      const termArea = document.querySelector("#frame-js");
      const termFrame = document.createElement("iframe")
      const titleFrame = document.createElement("h3")

      termFrame.width = "800px";
      termFrame.height = "200px";
      termFrame.src = `terms.html?term_id=${callSet.result.term_list[i].term_id}`;

      titleFrame.textContent = callSet.result.term_list[i].title;

      titleFrame.append(termFrame);
      termArea.append(titleFrame);
    }

  }


  //pullset
  function pull_set(callSet) {
    const $select = document.querySelector("#js-select");
    const sets = callSet.result.term_list;

    for (let i = 0; i < sets.length; i++) {
      const option = document.createElement("option");
      option.textContent = sets[i].title;
      option.value = sets[i].term_id;

      $select.append(option);

    }

    $select.onchange = function (e) {
      const term = document.getElementById("pull-js")
      term.src = `terms.html?term_id=${e.target.value}`;

    }

  }

  //popset


  function pop_set(callSet) {
    const close = document.getElementById('js_close');
    const modal = document.getElementById('modal');
    const mask = document.getElementById('mask');


    const result = callSet.result.term_list;
    const termset = document.querySelector("#js-termset");

    for (let i = 0; i < result.length; i++) {
      const li = document.createElement("li");
      const button = document.createElement("button");
      button.textContent = result[i].title;
      button.setAttribute("id", result[i].term_id);
      button.classList.add("js");

      li.append(button);
      termset.append(li);

      button.onclick = function (e) {
        modal.classList.remove('hidden');
        mask.classList.remove('hidden');

        const term = document.querySelector("#js-term");
        const termUrl = `https://termhub.jp/terms/CRP0000001/${e.target.id}.json`;

        const xhr = new XMLHttpRequest();
        xhr.open("GET", termUrl);
        xhr.responseType = "json";
        xhr.send();

        xhr.onload = function () {
          callTerm = xhr.response;
          writeTerm(callTerm);
        }

        function writeTerm(callTerm) {
          const term = document.querySelector("#js-term");

          term.innerHTML = callTerm.result.body;

        }

      }

      close.onclick = function () {
        modal.classList.add('hidden');
        mask.classList.add('hidden');
      }
  
      mask.onclick = function () {
        close.click();
      }


    }


  }








}






//


//リンク型の規約呼び出し

function dispTerm(corpoId) {
  function getTermid() {
    return window.location.search.replace("?term_id=", "");
  }

  const termUrl = `https://termhub.jp/terms/${corpoId}/${getTermid()}.json`;

  const xhr = new XMLHttpRequest();
  xhr.open("GET", termUrl);
  xhr.responseType = "json";
  xhr.send();

  xhr.onload = function () {
    callTerm = xhr.response;
    writeTerm(callTerm);
  }

  function writeTerm(callTerm) {
    const term = document.querySelector("#js-term");

    term.innerHTML = callTerm.result.body;
  }



}





//返り値
// {
//   "result" : {
//     "term_set_id" : "TMS0000023",
//     "version" : "6",
//     "term_list" : [ {
//       "title" : "サービス共通プライバシーポリシー",
//       "version" : "4",
//       "term_id" : "TRM0000011",
//       "term_url" : null
//     }, {
//       "title" : "全社共通利用規約",
//       "version" : "1",
//       "term_id" : "TRM0000032",
//       "term_url" : null
//     } ]
//   }
// }
