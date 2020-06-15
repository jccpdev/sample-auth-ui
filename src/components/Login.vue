<template>
    <div id="loginPage">
        <form v-on:submit.prevent="loginAction">
            <table style="width:300px; margin: 0 auto;">
                <tr v-if="response">
                    <td colspan="2">
                        <pre>
                            <span :class="{ 'is-error': is_error }" v-text="response"></span>
                        </pre>

                    </td>
                </tr>
                <tr>
                    <td><label for="username">Username</label></td>
                    <td><input id="username" v-model="username"/></td>
                </tr>
                <tr>
                    <td><label for=password>Password</label></td>
                    <td><input id="password" type="password" v-model="password"/></td>
                </tr>
                <tr>
                    <td colspan="2">
                        <button>Login</button>
                    </td>
                </tr>
            </table>

        </form>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'login',
        data() {
            return {
                username: 'jccp',
                password: 'SuperSecret&01',
                token: '',
                session: '',
                is_error: false,
                response: '',
            };
        },
        methods: {
            loginAction() {
                axios.post('http://auth.kloans.service/kloans-authentication/login', {
                    username: this.username,
                    password: this.password,
                })
                    .then((response) => {
                        this.response = response;
                    })
                    .catch((error) => {
                        this.response = error.response.data.error.message;
                        this.is_error = true;
                    });
            },
        },
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }

    .is-error {
        color: red;
    }
</style>
