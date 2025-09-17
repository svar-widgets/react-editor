import { Field, Combo } from '@svar-ui/react-core';
import './Links.css';

function Links({ value }) {
  const list = [
    { id: 'e2s', label: 'End-to-start' },
    { id: 's2s', label: 'Start-to-start' },
    { id: 'e2e', label: 'End-to-end' },
    { id: 's2e', label: 'Start-to-end' },
  ];

  function onClick(e) {
    const { action } = e.target.dataset;
    if (action) {
      // delete link here: api.exec(action, { id });
    }
  }

  function handleChange() {
    // update link here: api.exec("update-link")
  }

  return (
    <>
      {value
        ? value.map((links) =>
            links.data.length ? (
              <div className="wx-C4q2UFW7 wx-links" key={links.title}>
                <Field label={links.title} position="top">
                  <table onClick={onClick}>
                    {links.data.map((obj) => (
                      <tr key={obj.link.id}>
                        <td className="wx-C4q2UFW7 wx-cell">
                          <div className="wx-C4q2UFW7 wx-task-name">
                            {obj.task.text || ''}
                          </div>
                        </td>

                        <td className="wx-C4q2UFW7 wx-cell">
                          <div className="wx-C4q2UFW7 wx-wrapper">
                            <Combo
                              value={obj.link.type}
                              placeholder="Select link type"
                              options={list}
                              onChange={(e) => handleChange(e, obj.link.id)}
                            >
                              {({ option }) => option.label}
                            </Combo>
                          </div>
                        </td>

                        <td className="wx-C4q2UFW7 wx-cell">
                          <i
                            className="wx-C4q2UFW7 wxi-delete wx-delete-icon"
                            data-action="delete-link"
                            data-id={obj.link.id}
                          ></i>
                        </td>
                      </tr>
                    ))}
                  </table>
                </Field>
              </div>
            ) : null,
          )
        : null}
    </>
  );
}

export default Links;
