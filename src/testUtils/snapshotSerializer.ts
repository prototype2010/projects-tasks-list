import pretty from 'pretty';
import htmlParser from 'html-parser';

const snapshotSanitizers = [
  (snapshot: string) =>
    snapshot.replace(/<[a-z]* +data\-remove\-from\-snapshot*.*>(.*)<\/[a-z]*>/gi, function (match) {
      return match.replace(/>(.*)</, function () {
        return `>** REMOVED FROM SNAPSHOT **<`;
      });
    }),
];

const makePrettyHTML = (content: string) => {
  const sanitized = htmlParser.sanitize(content, {
    elements: ['script', 'img', 'svg', 'style', 'head', 'noscript'],
    comments: true,
    attributes: ['style', 'class', 'role', 'tabindex', 'aria-haspopup', 'aria-labelledby', 'id'],
    docTypes: true,
  });

  const sanitizedVariableData = snapshotSanitizers.reduce((cumulative, current) => {
    return current(cumulative);
  }, sanitized);

  return pretty(sanitizedVariableData, { ocd: true });
};

export default {
  serialize(val: any) {
    return makePrettyHTML(val.container.innerHTML);
  },

  test(val: any) {
    return !!val?.container?.innerHTML;
  },
};
