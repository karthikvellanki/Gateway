Vue.component('modal', {
    data: function () {
        return {
            modal_is_visible: false,
            shared
        }
    },
    methods: {
        saveNewFormField(event){
            event.preventDefault();
            //let newFieldName =  shared.field_being_created.field_name;
            shared.saved_fields.push(shared.field_being_created);
            this.resetFieldBeingCreated();
            this.modal_is_visible = false;
        },
        resetFieldBeingCreated(){
            shared.field_being_created = {};
        }
    },

    template: `
    <div class="modal" :class="{'is-active' : modal_is_visible}">
    <form @submit="saveNewFormField($event)">
        <div class="modal-background" @click="modal_is_visible = false"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Add Request Field</p>
                <button class="delete" aria-label="close"></button>
            </header>
            <section class="modal-card-body">

                <div class="control">
                    <label for="field_name" class="label">Field Name</label>
                    <input class="input" type="text" name="field_name" id="field_name" v-model="shared.field_being_created.field_name" required>
                </div>

                <div class="control">
                    <label for="field_type" class="label mt-1">Field Type</label>
                    <div class="select">
                        <select name="field_type" id="field_type" v-model="shared.field_being_created.field_type" required>
                            <option value="">Select Input Type</option>
                            <option value="text">Text</option>
                            <option value="email">Email</option>
                            <option value="number">Number</option>
                            <option value="tel">Tel</option>
                        </select>
                    </div>
                </div>

                <div v-if="shared.field_being_created.field_type == 'text'">
                    <div class="control mt-1">
                        <label for="field_min_length" class="label">Field Min Length</label>
                        <input class="input" type="number" name="field_min_length" id="field_min_length" v-model="shared.field_being_created.field_min_length">
                    </div>
                    
                    <div class="control mt-1">
                        <label for="field_max_length" class="label">Field Max Length</label>
                        <input class="input" type="number" name="field_max_length" id="field_max_length" v-model="shared.field_being_created.field_max_length">
                    </div>
                </div>
                

                <div class="control mt-1">
                    <label for="field_placeholder" class="label">Field Placeholder</label>
                    <input class="input" type="text" name="field_placeholder" id="field_placeholder" v-model="shared.field_being_created.field_placeholder" required>
                </div>

                <div class="control mt-1 mb-1">
                    <label class="label">Make Field Required?</label>
                    <label class="radio">
                        <input type="radio" name="field_required" value="1" v-model="shared.field_being_created.field_is_required" required>
                        Yes
                    </label>
                    <label class="radio">
                        <input type="radio" name="field_required" value="0" v-model="shared.field_being_created.field_is_required" required>
                        No
                    </label>
                </div>

            </section>
            <footer class="modal-card-foot">
                <button class="button is-success">Save changes</button>
                <button class="button" @click="modal_is_visible = false">Cancel</button>
            </footer>
        </div>
    </form>
</div>
    `,
    mounted() {
        window.Event.listen('onLaunchModal', () => {
            this.modal_is_visible = true;
        });
        window.Event.listen('onCloseModal', () => {
            this.modal_is_visible = false;
        });
    }
})