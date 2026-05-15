<script>
  (function(d,t) {
    var BASE_URL="https://chat.kawtheron.tech";
    var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
    g.src=BASE_URL+"/packs/js/sdk.js";
    g.async = true;
    s.parentNode.insertBefore(g,s);
    g.onload=function(){
      window.chatwootSDK.run({
        websiteToken: 'pBnH3x8A8akHhEqafPgEVbhg',
        baseUrl: BASE_URL
      })
    }
  })(document,"script");
</script>
