export default defineAppConfig({
  ui: {
    primary: 'lime',
    gray: 'neutral',
    button: {
      variant: {
        neobrutalist: 'flex text-text cursor-pointer items-center rounded-base border-2 border-border dark:border-darkBorder bg-main px-4 py-2 text-sm font-base shadow-light dark:shadow-dark transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none dark:hover:shadow-none disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-light dark:disabled:hover:shadow-dark' ,
        neobrutalistOutline: 'flex text-text cursor-pointer items-center rounded-base border-2 border-border dark:border-darkBorder bg-bg px-4 py-2 text-sm font-base shadow-light dark:shadow-dark transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none dark:hover:shadow-none disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-light dark:disabled:hover:shadow-dark' 
      }
    },
    input: {
      variant: {
        neobrutalist: 'rounded-base bg-white dark:bg-secondaryBlack border-2 border-border dark:border-darkBorder p-[10px] font-base ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 outline-none',
      }
    },
    card: {
      base: 'overflow-hidden',
      background: 'bg-bg dark:bg-darkBg',
      rounded: 'rounded-base',
      shadow: 'shadow-light dark:shadow-dark',
      ring: 'border-2 border-border dark:border-darkBorder',
      body: {
        base: 'text-black',
        padding: 'p-6'
      },
      header: {
        base: 'flex flex-col space-y-1.5',
        padding: 'p-6'
      },
      footer: {
        base: 'flex items-center',
        padding: 'px-6 pb-6'
      },
      title: 'text-xl leading-none font-heading tracking-tight',
      description: 'text-sm text-text dark:text-darkText font-base mt-3'
    },
  }
})