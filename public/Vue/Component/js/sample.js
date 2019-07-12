// Vue.component('button-counter', {
//     data: function () {
//       return {
//         count: 0
//       }
//     },
//     template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
// })

var ButtonCounter ={
  data: function () {
    return {
      count: 0
    }
  },
  template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
}

// Vue.component('blog-post', {
//     props: ['post'],
//     template: `
//     <div class="blog-post">
//       <h3>{{ post.title }}</h3>
//       <button v-on:click="$emit('enlarge-text')">
//         Enlarge text
//       </button>
//       <div v-html="post.content"></div>
//     </div>
//   `
// })

var BlogPost = {
  props: ['post'],
  template: `
  <div class="blog-post">
    <h3>{{ post.title }}</h3>
    <button v-on:click="$emit('enlarge-text')">
      Enlarge text
    </button>
    <div v-html="post.content"></div>
  </div>
`
}

Vue.component('custom-input', {
    props: ['value'],
    template: `
      <input
        type="password"
        v-bind:value="value"
        v-on:input="$emit('input', $event.target.value)"
        placeholder="password"
      >
    `
})

Vue.component('alert-box', {
    template: `
      <div class="demo-alert-box">
        <strong>Error!</strong>
        <slot></slot>
      </div>
    `
})

Vue.component('base-checkbox', {
    model: {
      prop: 'checked',
      event: 'change'
    },
    props: {
      checked: Boolean
    },
    template: `
      <input
        type="checkbox"
        v-bind:checked="checked"
        v-on:change="$emit('change', $event.target.checked)"
      >
    `
})

new Vue({
    el: "#component-demo",
    data: {
      posts: [
        { id: 1, title: 'My journey with Vue' },
        { id: 2, title: 'Blogging with Vue' },
        { id: 3, title: 'Why Vue is so fun' }
      ],
      postFontSize: 1,
      searchText: "",
      lovingVue: true,
      object: {
        title: 'How to do lists in Vue',
        author: 'Jane Doe',
        publishedAt: '2016-04-10'
      },
      items: [
        { message: 'Foo' },
        { message: 'Bar' }
      ]
    },
    components: {
      'button-counter': ButtonCounter,
      'blog-post': BlogPost
    }
})