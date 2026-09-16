import 'vuetify/styles';

import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import { VDateInput } from 'vuetify/labs/VDateInput';
import { VColorInput } from 'vuetify/labs/VColorInput';

export default createVuetify({
    components: {
        ...components,
        VDateInput,
        VColorInput
    },
    directives,
    theme: { defaultTheme: 'dark' },
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi
        }
    }
});