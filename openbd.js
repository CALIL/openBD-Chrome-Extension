// 対応サイトの定義
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

// 本のデータをパース
const parseBook = (book)=>{
  // console.log(book.onix);
  // 書影
  let thumbnail = null;
  // タイトル
  let title = book.onix.DescriptiveDetail.TitleDetail.TitleElement.TitleText.content;
  let titleYomi = book.onix.DescriptiveDetail.TitleDetail.TitleElement.TitleText.collationkey;
  // 紹介・目次
  let description = null;
  let descriptionLong = null;
  let tableOfContents = null;
  // console.log(book.onix.CollateralDetail.SupportingResource)
  if(book.summary.cover){
    thumbnail = book.summary.cover;
  }
  // console.log(book.onix.CollateralDetail.TextContent)
  if(book.onix.CollateralDetail.TextContent){
    book.onix.CollateralDetail.TextContent.forEach((text)=>{
      // console.log(text)
      if(text.TextType==='02'){
        description = text.Text;
      }
      if(text.TextType==='03'){
        descriptionLong = text.Text;
      }
      if(text.TextType==='04'){
        tableOfContents = text.Text;
      }
    });
  }
  // 著者
  let parseAuthor = (author)=>{
    if(typeof author.PersonName === 'string'){
      authors.push({
        name: author.PersonName,
        yomi: null,
        profile: author.BiographicalNote
      });
    }else{
      authors.push({
        name: author.PersonName.content,
        yomi: author.PersonName.collationkey,
        profile: author.BiographicalNote
      });
    }
  };
  let authors = [];
  if(book.onix.DescriptiveDetail.Contributor instanceof Array){
    book.onix.DescriptiveDetail.Contributor.forEach((author)=>{
      parseAuthor(author);
    });
  }else{
    parseAuthor(book.onix.DescriptiveDetail.Contributor);
  }

  // console.log(title, titleYomi);
  // console.log(authors);
  // console.log(description, descriptionLong, tableOfContents)
  return {
    thumbnail: thumbnail,
    title: title,
    titleYomi: titleYomi,
    authors: authors,
    description: description,
    descriptionLong: descriptionLong,
    tableOfContents: tableOfContents,
    isbn: book.summary.isbn,
    publisher: book.summary.publisher,
    author: book.summary.author
  };
};


// 本の追加
const renderBook = (book)=>{
  let content = document.createElement('div');
  content.className = 'openbd_content';

  let authorContent = '';
  // 著者情報の追加
  if(book.authors.length>0){
    authorContent = '<h2 class="openbd_header">著者</h2>';
    book.authors.forEach((author)=> {
      let authorYomi = author.yomi ? '(' + author.yomi + ')' : '';
      authorContent += `<h3 class="openbd_author_header">${author.name}${authorYomi}</h3>`;
      if(author.profile){
        authorContent += `<div class="openbd_author_profile">${author.profile}</div>`;
      }
    });
  }

  if(book.thumbnail){
    content.innerHTML += `<img src="${book.thumbnail}" />`;
  }
  let titleYomi = (book.titleYomi) ? '(' + book.titleYomi + ')' : '';
  content.innerHTML += `
  <h2 class="openbd_header">タイトル</h2>
  <div class="openbd_title">${book.title}${titleYomi}</div>
  `;
  if(book.description || book.descriptionLong){
    content.innerHTML += '<h2 class="openbd_header">紹介</h2>';
  }
  if(book.description){
    content.innerHTML += `<div class="openbd_description">${book.description}</div>`;
  }
  if(book.descriptionLong){
    content.innerHTML += `<div class="openbd_description">${book.descriptionLong}</div>`;
  }
  if(book.tableOfContents){
    content.innerHTML += `
    <h2 class="openbd_header">目次</h2>
    <div class="openbd_tableOfContents">${book.tableOfContents}</div>
    `;
  }
  content.innerHTML += authorContent;
  content.innerHTML += `
  <h2 class="openbd_header">ISBN</h2>
  <div class="openbd_isbn">${book.isbn}</div>
  <h2 class="openbd_header">出版社</h2>
  <div class="openbd_publisher">${book.publisher}</div>
  `;
  content.innerHTML += `
  <div class="openbd_powered">by <a href="https://openbd.jp/" target="_blank">openBD</a></div>
  `;
  if(insert==='after'){
    targetElement.parentNode.insertBefore(content, targetElement.nextSibling);
  }else if(insert==='before'){
    targetElement.parentNode.insertBefore(content, targetElement);
  }
};

// スタイルの追加
const renderStyle = ()=>{
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
    font-size: 1.25em;
    font-weight: bold !important;
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
    font-size: 1em;
    color: #000000;
    margin: 0.5em 0 0.5em;
  }
  .openbd_author_profile {
    font-size: 1em
  }
  .openbd_powered, .openbd_powered a {
    color: #999999;
    font-size: 0.8em;
    text-align: right;
  }
  `;
  if(insert==='after'){
    targetElement.parentNode.insertBefore(style, targetElement.nextSibling);
  }else if(insert==='before'){
    targetElement.parentNode.insertBefore(style, targetElement);
  }
};

// APIから書誌を取得
if (isbn) {
  // console.log('ISBN:' + isbn);
  new api([isbn], (data)=> {
    // document.body.append(JSON.stringify(data));
    renderStyle();
    data.forEach(function (book) {
      // 書誌があれば
      if (book !== null){
        let b = parseBook(book);
        renderBook(b);
      };
    })
  });
}

// // sample api data
// console.log(chrome.extension.getURL('/api.json'))
// superagent
// .get(chrome.extension.getURL('/api.json'))
// .end(function(err, res){
//   if(!err){
//     let data = JSON.parse(res.text);
//     // console.log(data);
//     renderStyle();
//     data.forEach((book)=>{
//       if(book!==null){
//         let b = parseBook(book);
//         b.isbn = isbn;
//         renderBook(b);
//       }
//     });
//   }
// });

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
