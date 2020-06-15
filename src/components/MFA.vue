<template>
    <div id="mfaPage">
        <form v-on:submit.prevent="mfaAction">
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
                    <td><label for=mfaCode>Mfa Code</label></td>
                    <td><input id="mfaCode" v-model="mfaCode"/></td>
                </tr>
                <tr>
                    <td><label for=session>Session</label></td>
                    <td><textarea id="session" v-model="session"></textarea></td>
                </tr>

                <tr>
                    <td colspan="2">
                        <button>Confirm</button>
                    </td>
                </tr>
            </table>

        </form>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'mfa',
        data() {
            return {
                username: 'jccp',
                mfaCode: '',
                session: '',
                is_error: false,
                response: '',
            };
        },
        methods: {
            mfaAction() {
                axios.post('http://auth.kloans.service/kloans-authentication/mfa', {
                    username: this.username,
                    mfaCode: this.mfaCode,
                    session: this.session,
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

    pre{
        white-space: pre-wrap;
    }
</style>
