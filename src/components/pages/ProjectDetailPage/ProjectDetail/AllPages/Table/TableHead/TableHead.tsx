import { Th, Tr } from './styles';

/**
 * A functional component that renders the table head for the page snapshots tab.
 *
 * @return {JSX.Element} The table head JSX element.
 */
export const TableHead = () => {
  return (
    <thead>
      <Tr>
        <Th>URL</Th>
        <Th>Created at</Th>
        <Th></Th>
      </Tr>
    </thead>
  );
};
