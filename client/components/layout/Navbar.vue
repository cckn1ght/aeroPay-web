<template>
  <nav class="navbar app-navbar" role="navigation" aria-label="main navigation" style="position: fixed;" >
    <div class="navbar-brand">
      <a class="navbar-item"  href="/">
        <img src="~assets/AP.png" alt="Aero Payments">
      </a>
      <p class="navbar-item">{{profile.email}}</p>
      <p v-if="checkAuth" class="navbar-item">
          revenue<span class="aero-number">&nbsp;{{transSum.totalAmount | money}}</span>
          &nbsp;&nbsp;&nbsp;transactions <span class="aero-number">&nbsp;{{transSum.totalCount | count}}</span>
           &nbsp;&nbsp;&nbsp;this month
            <span class="aero-number">
              &nbsp;{{thisMonth | money}}
            </span>
        </p>
    </div>

    <div id="navMenu" class="navbar-menu">
      <div class="navbar-end">
        <p class="navbar-item">{{userRole}}</p>
        <p class="navbar-item">{{locs}}</p>
        <span class="line-spacer">&nbsp;</span>
        <router-link v-if="!checkAuth" to="/login" class="navbar-item">login</router-link>
        <a v-if="checkAuth" @click="logoutClick" class="navbar-item">logout</a>
      </div>
    </div>
  </nav>

</template>

<script>
import { mapGetters, mapActions } from "vuex";
import userRolesMap from 'utils/userRolesMap'
export default {
  components: {
  },

  props: {
    show: Boolean
  },

  computed: {
    ...mapGetters({
      pkginfo: "pkg",
      sidebar: "sidebar",
      checkAuth: "checkAuth",
      transSum: "transSum",
      merchant: "merchant",
      locations: "locations",
      profile: "profile"
    }),
    thisMonth () {
      const { monthlyAmount } = this.transSum;
      if (!monthlyAmount || monthlyAmount.length === 0) {
        return 0;
      }
      return monthlyAmount[monthlyAmount.length - 1].totalAmount
    },
    userRole () {
      if (!this.merchant) {
        return '';
      }
      return userRolesMap[this.merchant.isAuthorized]
    },
    locs () {
      if (this.userRole === userRolesMap[0]) return '';
      if (!this.locations || this.locations.length === 0) {
        return ''
      }
      return this.locations.map(loc => loc.merchantLocationId)
    }
  },
  methods: {
    ...mapActions(["toggleSidebar", "logout"]),
    logoutClick() {
      this.logout(this.$router);
      // this.$router.push('login');
    }
  },
  filters: {
    money(value) {
      if (!value) value = 0;
      return "$" + value.toFixed(2);
    },
    count(value) {
      if (!value) return 0;
      return value;
    }
  }
};
</script>

<style lang="scss" scoped>
// @import "~bulma/sass/utilities/variables";
@import "~bulma";
.app-navbar {
  position: fixed;
  min-width: 100%;
  z-index: 1024;
  box-shadow: 0 2px 3px rgba(17, 17, 17, 0.1), 0 0 0 1px rgba(17, 17, 17, 0.1);

  .container {
    margin: auto 10px;
  }

  .nav-right {
    align-items: stretch;
    align-items: stretch;
    flex: 1;
    justify-content: flex-end;
    overflow: hidden;
    overflow-x: auto;
    white-space: nowrap;
  }
}

.hero-brand {
  .aeropay {
    color: #5fc8d8;
    font-family: "futura-pt";
    font-size: 13px;
    text-transform: uppercase;
    text-decoration: none;
    letter-spacing: 2px;
    font-weight: 500;
    font-style: normal;
    line-height: 1em;
  }
}
.tooltip .tooltiptext {
  visibility: hidden;
  width: 400px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;

  /* Position the tooltip */
  position: absolute;
  z-index: 1;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
}
.navbar-total {
  margin-right: 300px;
}
.aero-number {
  color: $primary;
  font-size: 25px;
}
  .line-spacer {
    display: block;
    height: 100%;
    width: 1px;
    background-color: grey;
  }
</style>
