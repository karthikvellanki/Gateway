const app = new Vue({
    el: '#app',
    data: {
        base_url : '',
        request_method : '',
        component_title : '',
        modal_is_visible : false,
        phone_number_regex : '[0-9]{3}-[0-9]{3}-[0-9]{4}',
        shared,
        component_built : '',
        sending_request : false,
        api_response : ''
    },
    methods: {
        launchNewFieldModal(){
            window.Event.fire('onLaunchModal')
        },
        hideFieldModal(){
            window.Event.fire('onCloseModal')
        },
        buildApiComponent(event){
            event.preventDefault();
            this.component_built = true;
        },
        callApi(event){
            event.preventDefault();

            $.ajax({
                beforeSend: () => {
                    this.sending_request = true;
                    this.api_response = '';
                },
                type: this.request_method,
                data: (this.getAjaxRequestFields(event)),
                url: this.base_url,
                success: (results) => {
                    this.sending_request = false;
                    this.api_response = results;
                },
                fail: (errors) => {
                    this.sending_request = false;
                    this.api_response = errors;
                }
            });
        },
        getAjaxRequestFields(event){
            const formFields = event.target.elements;
            const ajaxRequestData = Array.from(formFields).filter(function(item, index){
                return item.type !== 'submit';
            })
                .map(function(item, index){
                    let fieldName = item.getAttribute('name');
                    let fieldValue = item.value;
                    let data = {};
                    data[fieldName] = fieldValue;
                    return data;
                });
            return Object.assign({}, ajaxRequestData)[0];
        }
    },
});
