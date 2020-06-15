<template>
    <div id="statusChecker">
        <form v-on:submit.prevent="refreshStatus">
            <table style="width:300px; margin: 0 auto;">
                <tr v-if="response">
                    <td colspan="2">
                        <span :class="{ 'is-error': is_error }" v-text="response"></span>
                    </td>
                </tr>
                <tr>
                    <td><span v-text="status"></span></td>
                    <td>
                        <button>Refresh Status</button>
                    </td>
                </tr>
                <tr>
                    <td colspan="2">

                    </td>
                </tr>
            </table>
        </form>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'statusChecker',
        props: [
            'token', 'ssn_last_4', 'date_of_birth',
        ],
        data() {
            return {
                status: '',
                response: '',
                is_error: false,
            };
        },
        created() {
            this.refreshStatus();
        },
        methods: {
            refreshStatus() {
                axios.post('http://auth.kloans.service/kloans-authentication/consumer/status', {
                    token: this.token,
                    ssn_last_4: this.ssn_last_4,
                    date_of_birth: this.date_of_birth,
                })
                    .then((response) => {
                        this.status = response.data.data.status;
                    })
                    .catch((error) => {
                        this.response = error.response.data.error.message;
                        this.is_error = true;
                    });
            },
            privateRefreshStatus: () => {

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
