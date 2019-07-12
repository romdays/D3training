var param = {
  keyid: "278994db4d7d72569dc93a2f112f9d0c",
  name: "",
  //area: 'AREA110',
  hit_per_page: 5,
}

if( navigator.geolocation ){
  navigator.geolocation.getCurrentPosition(
    function(position){
      param.latitude = position.coords.latitude
      param.longitude = position.coords.longitude
      param.range = 5
    },
    function(){
      param.area = 'AREA110'
      alert('現在地を取得できませんでした')
    })
}
else{
	alert( "あなたの端末では、現在位置を取得できません。" ) ;
}

const testAxios = axios.create({
  headers: {
    'Content-Type': 'application/json',
    // 'X-Requested-With': 'XMLHttpRequest',
  },
  responseType: 'json',
});

var searchBox = {
  props: ['value'],
  template: `
  <div>
      <input
        type="text"
        :value="value"
        @input="$emit('input', $event.target.value)"
        @keyup.enter="$emit('get-info')"
        placeholder="input keyword"
      >
      <button @click="$emit('get-info')">search</button>
      </div>
  `
}

var searchResult = {
  props: ['item'],
  template:`
    <div>
      <a :href="item.url"> {{item.name}} </a>
      <p> {{item.pr.pr_short}} </p>
      <img border="1" :src="item.image_url.shop_image1" width="128" height="128" :alt="item.name">
    </div>
  `
}

var vm = new Vue({
  data: function(){
    return {
      searchText: "",
      info: null,
    }
  },
  components: {
    'search-box': searchBox,
    'search-result': searchResult,
  },
  methods: {
    getInfo: function(){
      param.name = this.searchText
      axios({
        method: 'get',
        url:'https://api.gnavi.co.jp/RestSearchAPI/v3/',
        params: param
      })
      .then(response => (this.info = response.data.rest))
      .catch(error => console.log(error))
    }
  },
}).$mount('#app')