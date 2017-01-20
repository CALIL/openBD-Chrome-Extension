// ISBNの抽出

const parseISBN = (isbnSelector)=> {
  let isbn = null;
  let list = document.querySelectorAll(isbnSelector)
  for(let item of list) {
    let match = item.innerHTML.replace(/-/g, '').match(/[0-9\-]{12}[0-9X]/);
    // console.log(match)
    if (match) {
      isbn = match[0];
      break;
    }
  };
  return isbn;
};


const SITES = [
  {
    url: 'https?://ilisod001.apsel.jp/',
    isbnSelector: '.normal-td',
    targetElement: document.querySelectorAll('.contents')[2],
    insert: 'after'
  },
  {
    url: 'https?://.*?/opac/wopc/pc/pages/SearchResultList.jsp',
    isbnSelector: '.normal-td',
    targetElement: document.querySelectorAll('.contents')[2],
    insert: 'after'
  },
  {
    url: 'https?://.*?/WebOpac/webopac/searchdetail.do',
    isbnSelector: '#highlight_keyword td',
    targetElement: document.querySelectorAll('#highlight_keyword')[0],
    insert: 'after'
  },
  {
    url: 'https?://www.amazon.co.jp/?.*?/dp/',
    isbnSelector: '.content li',
    targetElement: document.querySelectorAll('#productDescription_feature_div')[0],
    insert: 'after'
  },
  {
    url: 'https://calil.jp/book/',
    isbnSelector: '.bookarea',
    targetElement: document.querySelectorAll('.detailheader')[0],
    insert: 'before'
  },
];

let isbn = null;
let targetElement = null;
let insert = null;

SITES.forEach((site)=> {
  let url = site.url.replace(/\//g, '\\/').replace(/\:/g, '\\:');
  // console.log(url);
  if (location.href.match(url)) {
    isbn = parseISBN(site.isbnSelector);
    targetElement = site.targetElement;
    insert = site.insert;
  }
});

// alert(location.href)
// alert(document.body.innerHTML)

if (isbn) {
  // console.log('ISBN:' + isbn);
  new api([isbn], (data)=> {
    // document.body.append(JSON.stringify(data));
    data.forEach(function (book) {
      let title = '現代人のためのヨーガ・スートラ';
      // TextType: 02 紹介
      let description = '難解と言われていた古代聖典『ヨーガ・スートラ』を現代人向けに解明。本書を読めば古代インドの偉大な叡智にふれることができる。';
      // TextType: 03 紹介
      let descriptionLong = '本書は、インド哲学への長年の研鑽をしてきたドイツ人ヨーギー、グレゴール・メーレによる鋭い洞察と深遠な解釈、現代人に訴えかける数々の具体例が見事に織りまぜられた、ヨーガの古代聖典、パタンジャリの『ヨーガ・スートラ』概説書である。<br> 古代の主要な注釈に、著者グレゴール・メーレ自身の見解、さらに監修者伊藤雅之の解説も加えて、従来難解と言われていた『ヨーガ・スートラ』を現代人向けに解明する。<br> <br> 古代インドの偉大な叡智にふれることによって、世界平安の一助となるだろう。<br>';
      // TextType: 04 目次
      let tableOfContents = '献辞<br> 祈り<br> 監修者まえがき<br> PREFACE<br> ヨーガ・スートラとヴィンヤサ・システムは、コインの裏表である<br> 日本語版付録1：ヨーガ・スートラの195章句<br> 日本語版付録2：サーンキヤ哲学における25の原理<br> 序章　ヨーガの歴史と系譜<br> 4つの時代／現代の実践者にとって4つの時代の持つ意味／退行あるいは進化<br> ヨーガ・スートラ<br> 第1章　サマーディ<br> 第2章　実践<br> 第3章　超自然力<br> 第4章　独存<br> 用語解説<br> ヨーガの師と聖仙の紹介<br> 参考文献<br> 日本語版付録3：『ヨーガ・スートラ』関連文献と本書の特徴<br> 索引<br> 著者・監訳者プロフィール<br>';
      // tableOfContents = tableOfContents.replace(/ /g, '&emsp;');
      // let introduction = '';
      //   <h2 class="openbd_header"></h2>
      //   <div class="openbd_introduction">${introduction}</div>

      let authors = [
        {
          name: 'グレゴール・メーレ',
          yomi: 'グレゴール・メーレ',
          profile: '歴史、哲学、比較宗教学をドイツの大学で学んだグレゴール・メーレは、ヨーガ、瞑想、哲学を学ぶため、1984年よりインドに毎年足を運んでいる。また、ドイツ自然療法士（ハイルプラクティカー）の免許に必要な資格を取り、解剖学的知識もある。1990年以降、ヨーガの中でも主にアシュタンガ・ヨーガを実践。現在は、サンスクリット語学習に熱意を注いでいる。オーストラリア、パースの8limbs Ashtanga Yogaの共同創設者であり、ディレクターでもある。'
        },
        {
          name: '伊藤雅之',
          yomi: 'イトウ マサユキ',
          profile: '愛知学院大学文学部国際文化学科准教授。1998年、米国ペンシルヴァニア大学大学院社会学博士課程修了（ph.D）。日本トランスパーソナル心理学／精神医学会理事。専門は宗教社会学、とくに現代世界に広がるスピリチュアリティ文化に関する研究をおこなう。おもな著書に『現代社会とスピリチュアリティ』（渓水社、2003年）がある。東京、名古屋、大阪などにて『ヨーガ・スートラ』の理論と実践に関する講座を定期開催している。'
        },
        {
          name: '加野 敬子',
          yomi: 'カノ ケイコ',
          profile: '神戸大学教育学部英語科卒業。訳書に『ヨーガの真実』、『自然ヨーガの哲学』（いずれも産調出版）など。'
        }
      ];

      // コンテンツの追加
      let content = document.createElement('div');
      content.className = 'openbd_content';

      // 著者情報の追加
      let authorContent = '<h2 class="openbd_header">著者</h2>';
      authors.forEach((author)=> {
        authorContent += `
        <h3 class="openbd_author_header">${author.name}(${author.yomi})</h3>
        <div class="openbd_author_profile">${author.profile}</div>
      `;
      });

      content.innerHTML = `
      <h2 class="openbd_header">ISBN</h2>
      <div class="openbd_title">${isbn}</div>
      <h2 class="openbd_header">タイトル</h2>
      <div class="openbd_title">${title}</div>
      <h2 class="openbd_header">紹介</h2>
      <div class="openbd_description">${description}</div>
      <div class="openbd_description">${descriptionLong}</div>
      <h2 class="openbd_header">目次</h2>
      <div class="openbd_tableOfContents">${tableOfContents}</div>
      ${authorContent}
      `;
      // body.appendChild(content);

      // スタイルの追加
      let style = document.createElement('style');
      style.innerHTML = `
      .openbd_content {
        font-size: 1em;
        margin: 3em auto;
        padding: 10px; 
        background-color: #ffffff;
        color: #636363;
        border-radius: 0.25em;
      }
      .openbd_header {
        font-size: 1em;
        color: #000000;
        margin: 1em 0 0.5em;
      }
      .openbd_header:after {
        content:"";
        display:block;
        height:1px;
        width:100%;
        background-color: #dddddd;
        background-image: -moz-linear-gradient(90deg, #efa8b0, #a89cc8, #8cc9f0);
        background-image: -webkit-linear-gradient(90deg, #efa8b0, #a89cc8, #8cc9f0);
        background-image: -ms-linear-gradient(90deg, #efa8b0, #a89cc8, #8cc9f0);
        background-image: linear-gradient(90deg, #efa8b0, #a89cc8, #8cc9f0);
      }
      .openbd_author_header {
        font-size: 0.8em;
        color: #000000;
        margin: 0.5em 0 0.5em;
      }
      .openbd_author_profile {
        font-size: 0.8em
      }
      `;

      // body.appendChild(style);
      if(insert==='after'){
        targetElement.parentNode.insertBefore(style, targetElement.nextSibling);
        targetElement.parentNode.insertBefore(content, targetElement.nextSibling);
      }else if(insert==='before'){
        targetElement.parentNode.insertBefore(style, targetElement);
        targetElement.parentNode.insertBefore(content, targetElement);
      }

      // 書誌がみつからない
      if (book === null) return;
      // console.log(book.Product.CollateralDetail.TextContent);
      // console.log(book.Product.DescriptiveDetail.Contributor);
      // let div = document.createElement('div');
      // div.innerHTML = JSON.stringify(book.Product.CollateralDetail.TextContent);
      // document.body.append(div);
      // let div2 = document.createElement('div');
      // div2.innerHTML = JSON.stringify(book.Product.DescriptiveDetail.Contributor);
    })
  });

}


// sample api data
console.log(chrome.extension.getURL('/api.json'))
superagent
.get(chrome.extension.getURL('/api.json'))
.end(function(err, res){
  if(!err){
    console.log(JSON.parse(res.text));
  }
});

// var injectScript;
//
// injectScript = function(file, node) {
//   var s, th;
//   th = document.getElementsByTagName(node)[0];
//   s = document.createElement('script');
//   s.setAttribute('type', 'text/javascript');
//   s.setAttribute('src', file);
//   return th.appendChild(s);
// };

// injectScript(chrome.extension.getURL('/api.js'), 'body');
// injectScript(chrome.extension.getURL('/embeded-script.js'), 'body');
// injectScript('http://lab.calil.jp/demo/openbd/superagent.js', 'body');
// injectScript('http://lab.calil.jp/demo/openbd/api.js?isbn='+isbn.join(','), 'body');
