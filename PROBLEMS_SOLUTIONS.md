# Problems/Solutions

## State management

**Problem**: Persisting state.

**Solution**: Cookies are used to persist state on refresh. This was chosen over localStorage to allow full serverside-rendering. In a real-world app, we'd ideally have a server hosting a database to persist storage.

**Problem**: App state.

**Solution**: All app state is held in the parent `TodoList` component, and passed around via props. This solution works well since the app is so small, with only a handful of components. Had the app been larger, I'd have made use of React's context to pass state further down the tree. Or had the app been more complex still, a solution like Redux would work well.

## Accessibility

**Problem**: Losing focus when deleting a todo item.

**Solution**: Focus on the todo list's title to allow the screen reader to begin from the start of the list. This also has the added bonus of some screen readers announcing "List item 1 of X: ...", where X is a number smaller than it was when previously announced, giving the user feedback that a deletion has indeed taken place. The screen reader will read the message "You're all done" if the list is now empty.
