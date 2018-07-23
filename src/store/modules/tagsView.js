import config from '@/config';

const TAGS_VIEW_KEY = 'tags-view';

const getTagsViewStorage = () => JSON.parse(sessionStorage.getItem(TAGS_VIEW_KEY));
const setTagsViewStorage = (views) => {
  sessionStorage.setItem(TAGS_VIEW_KEY, JSON.stringify(views));
};

const tagsView = {
  state: {
    visitedViews: getTagsViewStorage() || [config.HOME_ROUTE],
    cachedViews: [],
  },
  getters: {
    visitedViews: state => state.visitedViews,
    cachedViews: state => state.cachedViews,
  },
  actions: {
    addVisitedViews({ commit, state }, view) {
      commit('ADD_VISITED_VIEWS', view);
      setTagsViewStorage([...state.visitedViews]);
    },
    // 删除当前标签页
    delVisitedViews({ commit, state }, view) {
      return new Promise((resolve) => {
        commit('DEL_VISITED_VIEWS', view);
        setTagsViewStorage([...state.visitedViews]);
        resolve([...state.visitedViews]);
      });
    },
    // 删除其他标签页
    delOthersViews({ commit, state }, view) {
      return new Promise((resolve) => {
        commit('DEL_OTHERS_VIEWS', view);
        setTagsViewStorage([...state.visitedViews]);
        resolve([...state.visitedViews]);
      });
    },
    // 删除全部标签页
    delAllViews({ commit, state }) {
      return new Promise((resolve) => {
        commit('DEL_ALL_VIEWS');
        setTagsViewStorage([...state.visitedViews]);
        resolve([...state.visitedViews]);
      });
    },
  },
  mutations: {
    // 添加已浏览的标签页数组中
    ADD_VISITED_VIEWS: (state, view) => {
      // 已存在, 不添加
      if (state.visitedViews.some(v => v.path === view.path)) {
        return;
      }
      state.visitedViews.push({
        name: view.name,
        path: view.path,
        title: view.meta.title || 'no-name',
      });
      // 如果当前路由配置了需要缓存, 则把路由 name 添加到缓存页面数组中
      if (!view.meta.noCache) {
        state.cachedViews.push(view.name);
      }
    },
    // 删除当前标签页
    DEL_VISITED_VIEWS: (state, view) => {
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.path === view.path) {
          state.visitedViews.splice(i, 1);
          break;
        }
      }
      for (const i of state.cachedViews) {
        if (i === view.name) {
          const index = state.cachedViews.indexOf(i);
          state.cachedViews.splice(index, 1);
          break;
        }
      }
    },
    // 删除其他标签页
    DEL_OTHERS_VIEWS: (state, view) => {
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.path === view.path) {
          state.visitedViews = state.visitedViews.slice(i, i + 1);
          break;
        }
      }
      // 删除其他标签页后, 不包含首页则添加首页 tag
      if (!state.visitedViews.some(v => v.path === config.HOME_ROUTE.path)) {
        state.visitedViews.unshift(config.HOME_ROUTE);
      }

      for (const i of state.cachedViews) {
        if (i === view.name) {
          const index = state.cachedViews.indexOf(i);
          state.cachedViews = state.cachedViews.slice(index, i + 1);
          break;
        }
      }
    },
    // 删除全部标签页
    DEL_ALL_VIEWS: (state) => {
      state.visitedViews = [];
      state.cachedViews = [];

      // 添加首页 tag
      state.visitedViews.unshift(config.HOME_ROUTE);
    },
  },
};

export default tagsView;
