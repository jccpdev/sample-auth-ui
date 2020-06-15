<template>
    <div id="registerPage">
        <form v-on:submit.prevent="registerUser">
            <table style="width:300px; margin: 0 auto;">
                <tr v-if="response">
                    <td colspan="2">
                        <span :class="{ 'is-error': is_error }" v-text="response"></span>
                    </td>
                </tr>
                <tr>
                    <td><label for="username">Username</label></td>
                    <td><input id="username" type="text" v-model="username"/></td>
                </tr>
                <tr>
                    <td><label for="password">Password</label></td>
                    <td><input id="password" type="password" v-model="password"/></td>
                </tr>
                <tr>
                    <td><label for="phone_number">Phone Number</label></td>
                    <td><input id="phone_number" type="text" v-model="phone_number"/></td>
                </tr>
                <tr>
                    <td colspan="2">
                        <button>Register</button>
                    </td>
                </tr>
            </table>
            <hr/>
            <status-checker :token="token" :ssn_last_4="ssn_last_4" :date_of_birth="date_of_birth"></status-checker>
        </form>
    </div>
</template>

<script>
    import axios from 'axios';
    import StatusChecker from '@/components/StatusChecker';

    export default {
        name: 'register',
        components: {
            StatusChecker,
        },
        data() {
            return {
                token: 'db647d44-d35b-4852-9dd0-6552676b8473',
                ssn_last_4: '1234',
                date_of_birth: '04/21/1991',
                username: 'jccp',
                password: 'SuperSecret&01',
                phone_number: '9545620675',
                response: '',
                is_error: false,
            };
        },
        methods: {
            registerUser() {
                axios.post('http://auth.kloans.service/kloans-authentication/user', {
                    token: this.token,
                    ssn_last_4: this.ssn_last_4,
                    date_of_birth: this.date_of_birth,
                    username: this.username,
                    password: this.password,
                    phone_number: this.phone_number,
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
