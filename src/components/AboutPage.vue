<template>
  <div>
    <section class="about-us">
      <h3>Welcome to Price Buddy</h3>
      <p>
        Your ultimate destination for comprehensive guitar comparisons. At Price Buddy,
        we are passionate about empowering musicians and enthusiasts to make informed
        decisions when it comes to selecting the perfect guitar. Our platform is dedicated
        to providing an extensive database of guitars, ranging from iconic classics to the
        latest releases, meticulously curated to cater to every musical style and preference.
      </p>

      <h3>Join Us at Price Buddy</h3>
      <p>
        Join us at Price Buddy, where we harmonize technology and passion to guide you towards
        finding the guitar that resonates with your unique musical identity.
        Music is great.
      </p>

      <div>
        <h2>Designed and developed</h2>
        <p>by</p>
        <p><strong>
            Sameer Limbu
          </strong>
        </p>
      </div>


    </section>
  </div>
</template>

<script>
  export default {
    name: 'AboutPage' // Change the name to be multi-word
  };
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.about-us {
  max-width: 450px;
  margin: auto;
  padding: 20px;
}

.about-us h2,
.about-us h3 {
  margin-bottom: 10px;
}

.footer {
  margin-top: 100px;
  text-align: center;
  padding: 10px;
  background-color: #f0f0f0;
}
</style>

