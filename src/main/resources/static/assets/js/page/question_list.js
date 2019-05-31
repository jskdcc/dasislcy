(function() {
    var model = new Model({
        el: 'body',
        init: {
            open: true
        },
        remote: {
            initLoad: {
                path: 'question/getChoiceQuestions',
                params: {
                    subjectId: 1,
                    type: 1,
                    currPage: 1,
                    pageSize: 10
                }
            }
        },
        include: {
            initRenderFilter: function(fieldName, value, $el, idx, obj) {
                if (-1 != fieldName.indexOf('options')) {
                    var options = "";
                    for (var option in value) {
                        options += "&nbsp;&nbsp;&nbsp;" + option;
                    }
                    return options;
                }
                return value;
            },

            initRenderAttr: function(fieldName) {
                if ('options' == fieldName) {
                    return 'html';
                }
            },

            initLoadAfter: function(data) {
                if (!this.isLoadPage) {
                    this.page = new Paging;
                    this.page.init({
                        target: '#page',
                        current: data.currPage,
                        pagesize: 3,
                        count: data.total,
                        callback: this.proxy(function(page, size, count) {
                            this.comp('remote', ['initLoad', function(config) {
                                config.params.currPage = page;
                            }]);
                        })
                    });
                    this.isLoadPage = true;
                } else {
                    this.page.render({
                        current: data.currPage,
                        count: data.total,
                        callback: this.proxy(function(page, size, count) {
                            this.comp('remote', ['initLoad', function(config) {
                                config.params.currPage = page;
                            }]);
                        })
                    });
                }
                return data;
            },

            initRenderComplete: function(initData) {
                $(".knob").knob();
            }
        }
    });
})();