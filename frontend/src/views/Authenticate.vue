<template>
  <main class="container text-center">
    <img src="../assets/images/icon-above-font.svg" width="400" height="400" alt="Groupomania Logo" class="logo">
    <p class="fs-4">
      Authentifiez-vous afin de partager du contenu multimédia avec vos collaborateurs !
    </p>
    <div class="col-md-9 m-auto mt-4">
      <ul class="nav nav-tabs bg-transparent" id="AuthenticateTabs" role="tablist">
        <li class="nav-item" role="presentation">
          <button class="nav-link active" id="login-tab" data-bs-toggle="tab" data-bs-target="#login" type="button" role="tab" aria-controls="login" aria-selected="true">
            <i class="bi bi-person-check-fill"></i> S'identifier
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" id="register-tab" data-bs-toggle="tab" data-bs-target="#register" type="button" role="tab" aria-controls="profile" aria-selected="false">
            <i class="bi bi-person-plus-fill"></i> S'enregistrer
          </button>
        </li>
      </ul>
      <div class="tab-content" id="AuthenticateTabsContent">
        <div class="tab-pane fade show active border-start border-end border-bottom bg-white rounded-bottom shadow-sm text-center" id="login" role="tabpanel" aria-labelledby="login-tab">
          <form action="POST" class="row p-4">
            <p class="text-center">Si vous ne disposez pas déjà d'un compte, enregistrez-vous !</p>
            <div class="col-md-7 m-auto text-start">
              <input v-model="login_email" type="email" class="form-control" placeholder="Adresse email" aria-label="Adresse email" name="email">
              <input v-model="login_password" type="password" class="form-control mt-3" placeholder="Mot de passe" aria-label="Mot de passe" name="password">
              <button @click.prevent="login" class="btn btn-primary mt-3" type="submit">Se connecter</button>
            </div>
          </form>
          <div v-if="login_errors.length" class="mt-2 mb-4 ms-2 me-2">
            <span v-for="error in login_errors" :key="error.index" class="alert" :class="login_error_type"><i class="bi bi-exclamation-triangle-fill"></i> {{ error }}</span>
          </div>
        </div>
        <div class="tab-pane fade border-start border-end border-bottom bg-white rounded-bottom shadow-sm text-center" id="register" role="tabpanel" aria-labelledby="register-tab">
          <form action="POST" class="row p-4">
            <p class="text-center">Si vous disposez déjà d'un compte, identifiez-vous !</p>
            <div class="col-md-7 m-auto text-start">
              <input v-model="register_email" type="email" class="form-control" placeholder="Adresse email" aria-label="Adresse email" name="email">
              <input v-model="register_password" type="password" class="form-control mt-3" placeholder="Mot de passe" aria-label="Mot de passe" name="password">
              <input v-model="register_password_check" type="password" class="form-control mt-3" placeholder="Vérification du mot de passe" aria-label="Vérification du mot de passe" name="passwordCheck">
              <button @click.prevent="register" class="btn btn-primary mt-3" type="submit">S'enregistrer</button>
            </div>
          </form>
          <div v-if="register_errors.length" class="mt-2 mb-4 ms-2 me-2">
            <span v-for="error in register_errors" :key="error.index" class="alert" :class="register_error_type"><i class="bi bi-exclamation-triangle-fill"></i> {{ error }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-3">
      Un problème pour vous authentifier ? <a class="link-primary" target="blank" href="mailto:contact@groupomania.com">contactez nous !</a>
    </div>
  </main>
</template>

<style lang="scss">
.logo {
  margin-top: -80px;
  margin-bottom: -100px;
}
#login-tab,
#register-tab {
  &.nav-link {
    color: black;
    &.active {
      color: #fd2d01;
    }
  }
}
</style>

<script>
const Axios = require("axios");
const DB = Axios.create({
  baseURL: "http://localhost:3000/api/",
});

export default {
  data: function () {
    return {
      login_email: "",
      login_password: "",
      register_email: "",
      register_password: "",
      register_password_check: "",
      login_errors: [],
      login_error_type: "",
      register_errors: [],
      register_error_type: "",
    };
  },
  methods: {
    login() {
      this.login_errors = [];
      this.login_error_type = "";
      const mailRegex =
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

      if (mailRegex.test(this.login_email) && this.login_password !== "") {
        const user = {
          email: this.login_email,
          password: this.login_password,
        };
        DB.post("authentication/login", user)
          .then((result) => {
            localStorage.setItem("token", result.data.token);
            this.$router.push("/");
          })
          .catch(() => {
            this.login_error_type = "alert-danger";
            this.login_errors.push("Identifiant ou mot de passe incorrect...");
          });
      } else {
        this.login_error_type = "alert-warning";
        this.login_errors.push(
          "Merci de renseigner tous les champs correctement"
        );
      }
    },

    register() {
      this.register_errors = [];
      this.register_error_type = "";
      const mailRegex =
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

      if (mailRegex.test(this.register_email)) {
        if (
          this.register_password !== "" &&
          this.register_password_check !== ""
        ) {
          if (this.register_password === this.register_password_check) {
            const user = {
              name: this.register_email.split("@")[0],
              email: this.register_email,
              password: this.register_password,
            };
            DB.post("authentication/signup", user)
              .then(() => {
                const user = {
                  email: this.register_email,
                  password: this.register_password,
                };
                DB.post("authentication/login", user)
                  .then((result) => {
                    localStorage.setItem("token", result.data.token);
                    this.$router.push("/");
                  })
                  .catch((error) => {
                    console.error(error);
                  });
              })
              .catch(() => {
                this.register_error_type = "alert-danger";
                this.register_errors.push("Cet identifiant existe déjà !");
              });
          } else {
            this.register_error_type = "alert-warning";
            this.register_errors.push(
              "Les deux mots de passe ne correspondent pas..."
            );
          }
        } else {
          this.register_error_type = "alert-warning";
          this.register_errors.push(
            "Merci de renseigner les champs de mot de passe..."
          );
        }
      } else {
        this.register_error_type = "alert-warning";
        this.register_errors.push(
          "Veuillez vérifier le format de votre adresse email..."
        );
      }
    },
  },
};
</script>