# CHANGELOG 

### Bugfixes: 
- Removed error message from TypeScript
- Added useEffect for proper rendering grid on initial render 
- Added deps to useEffect to react to form params change
- Fixed corner case when scrollbars are at the bottom right corner and container dimension were changed by using ref

### Visual:
- Replaced `fixed` with `absolute` prop for cell positioning as it should be relative to the parent, not the viewport

### Redability:
- Created separate interfaces/types + extracted them to separate file
- Replaced inline styles for wrappers with CSS-in-JS as styled-components are already installed as a dependency
- Extracted utils into separated file
- Reduced size calculation to one function
- Reduced amount of inline code within the `return` part of the components

### Performance: 
- wrapped size calculations in useMemo hook
- wrapped scroll handler in useCallback

### To be added/considered in the future:
- Tests
- Initial value of some properties shouldn't be 0, because later we are dividing by its value. Since within interface 
- Better naming?
