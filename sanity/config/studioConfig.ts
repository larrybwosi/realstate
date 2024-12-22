import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from '../schemas'
import { myTheme } from './studioTheme'
import StudioNavbar from './StudioNavbar'
import StudioLogo from './StudioLogo'

export default defineConfig({
  basePath: '/studio',
  name: 'ApartmentFinder_Studio',
  title: 'ApartmentFinder Studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  plugins: [deskTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
  studio: {
    components: {
      logo: StudioLogo,
      navbar: StudioNavbar,
    },
  },
  theme: myTheme,
})

