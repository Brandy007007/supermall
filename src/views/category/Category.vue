<template>
  <div class="wrapper">
    <ul class="content">
      <li>category1</li>
      <li>category2</li>
      <li>category3</li>
      <li>category4</li>
      <li>category5</li>
      <li>category6</li>
      <li>category7</li>
      <li>category8</li>
      <li>category9</li>
      <li>category10</li>
      <li>category11</li>
      <li>category12</li>
      <li>category13</li>
      <li>category14</li>
      <li>category15</li>
      <li>category16</li>
      <li>category17</li>
      <li>category18</li>
      <li>category19</li>
      <li>category20</li>
      <li>category21</li>
      <li>category22</li>
      <li>category23</li>
      <li>category24</li>
      <li>category25</li>
      <li>category26</li>
      <li>category27</li>
      <li>category28</li>
      <li>category29</li>
      <li>category30</li>
      <li>category31</li>
      <li>category32</li>
      <li>category33</li>
      <li>category34</li>
      <li>category35</li>
      <li>category36</li>
      <li>category37</li>
      <li>category38</li>
      <li>category39</li>
      <li>category40</li>
      <li>category41</li>
      <li>category42</li>
      <li>category43</li>
      <li>category44</li>
      <li>category45</li>
      <li>category46</li>
      <li>category47</li>
      <li>category48</li>
      <li>category49</li>
      <li>category50</li>
      <li>category51</li>
      <li>category52</li>
      <li>category53</li>
      <li>category54</li>
      <li>category55</li>
      <li>category56</li>
      <li>category57</li>
      <li>category58</li>
      <li>category59</li>
      <li>category60</li>
      <li>category61</li>
      <li>category62</li>
      <li>category63</li>
      <li>category64</li>
      <li>category65</li>
      <li>category66</li>
      <li>category67</li>
      <li>category68</li>
      <li>category69</li>
      <li>category70</li>
      <li>category71</li>
      <li>category72</li>
      <li>category73</li>
      <li>category74</li>
      <li>category75</li>
      <li>category76</li>
      <li>category77</li>
      <li>category78</li>
      <li>category79</li>
      <li>category80</li>
      <li>category81</li>
      <li>category82</li>
      <li>category83</li>
      <li>category84</li>
      <li>category85</li>
      <li>category86</li>
      <li>category87</li>
      <li>category88</li>
      <li>category89</li>
      <li>category90</li>
      <li>category91</li>
      <li>category92</li>
      <li>category93</li>
      <li>category94</li>
      <li>category95</li>
      <li>category96</li>
      <li>category97</li>
      <li>category98</li>
      <li>category99</li>
      <li>category100</li>
    </ul>
  </div>
</template>

<script>
import BetScroll from "better-scroll";
export default {
  name: "Category",
  data() {
    return {
      scroll: null,
    };
  },
  created() {
    // new BetScroll(document.querySelector('.wrapper'), {});
  },
  mounted() {
    console.log(document.querySelector(".wrapper"));
    // console.log(BetScroll);
    // this.scroll = new BetScroll(document.querySelector(".wrapper"), {});
    this.scroll = new BetScroll('.wrapper', {
      // mouseWheel:true
    });
  },
};
</script>

<style scoped>
.wrapper {
  height: 150px;
  background-color: #bfa; 
  /* overflow: auto; */
}
</style>