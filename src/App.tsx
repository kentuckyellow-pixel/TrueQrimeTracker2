import React, { useState, useEffect } from "react";

const SleuthMasterPro = () => {
  const [caseData, setCaseData] = useState({
    title: "",
    status: "Active",
    role: "",
    opened: "",
    references: [],
  });
  const [timeline, setTimeline] = useState([]);
  const [persons, setPersons] = useState([]);
  const [evidence, setEvidence] = useState([]);
  const [theories, setTheories] = useState([]);
  const [media, setMedia] = useState([]);
  const [darkMode, setDarkMode] = useState(true);

  const addItem = (setFunc, newItem) => setFunc((prev) => [...prev, newItem]);

  useEffect(() => {
    const savedData = localStorage.getItem("sleuthData");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setCaseData(parsed.caseData || caseData);
      setTimeline(parsed.timeline || timeline);
      setPersons(parsed.persons || persons);
      setEvidence(parsed.evidence || evidence);
      setTheories(parsed.theories || theories);
      setMedia(parsed.media || media);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "sleuthData",
      JSON.stringify({ caseData, timeline, persons, evidence, theories, media })
    );
  }, [caseData, timeline, persons, evidence, theories, media]);

  const calculateProgress = () => {
    const sections = 6;
    const filled = [
      caseData.title ? 1 : 0,
      timeline.length > 0 ? 1 : 0,
      persons.length > 0 ? 1 : 0,
      evidence.length > 0 ? 1 : 0,
      theories.length > 0 ? 1 : 0,
      media.length > 0 ? 1 : 0,
    ].reduce((a, b) => a + b, 0);
    return ((filled / sections) * 100).toFixed(0);
  };

  const styles = {
    container: {
      backgroundColor: darkMode ? "#2E2E2E" : "#FFFFFF",
      color: darkMode ? "#FFFFFF" : "#000000",
      fontFamily: "sans-serif",
      padding: "20px",
    },
    header: { fontFamily: "serif", color: darkMode ? "#990000" : "#D2B48C" },
    section: { marginBottom: "20px" },
    table: { width: "100%", borderCollapse: "collapse" },
    th: { borderBottom: "1px solid #D2B48C" },
    td: { borderBottom: "1px solid #D2B48C", padding: "5px" },
    input: {
      backgroundColor: darkMode ? "#000000" : "#F0F0F0",
      color: darkMode ? "#FFFFFF" : "#000000",
      border: "1px solid #D2B48C",
      padding: "5px",
      margin: "5px 0",
    },
    button: {
      backgroundColor: "#990000",
      color: "#FFFFFF",
      border: "none",
      padding: "10px",
      margin: "5px 0",
      cursor: "pointer",
    },
  };

  const handleAddTimeline = () =>
    addItem(setTimeline, {
      timestamp: "",
      event: "",
      source: "",
      mediaRef: "",
      weight: false,
      verification: "Pending",
    });

  const handleAddPerson = () =>
    addItem(setPersons, {
      name: "",
      image: "",
      role: [],
      alibi: "",
      connections: "",
      indicators: [],
      mediaMentions: "",
      assessment: "",
    });

  const handleAddEvidence = () =>
    addItem(setEvidence, {
      id: evidence.length + 1,
      description: "",
      category: "",
      status: "Pending",
      link: "",
      chainNotes: "",
      strength: "",
    });

  const handleAddTheory = () =>
    addItem(setTheories, {
      title: "",
      premise: "",
      supporting: "",
      contradictions: "",
      probability: 50,
      origin: "",
      notes: "",
    });

  const handleAddMedia = () =>
    addItem(setMedia, {
      title: "",
      platform: "",
      timestamps: "",
      takeaways: "",
      rating: "",
      linkedTo: "",
    });

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>SleuthMaster Pro</h1>
      <p>True Crime Case Organizer</p>
      <button style={styles.button} onClick={() => setDarkMode(!darkMode)}>
        Toggle Dark Mode
      </button>
      <p>Progress: {calculateProgress()}%</p>

      <section style={styles.section}>
        <h2 style={styles.header}>Case Core</h2>
        <input
          style={styles.input}
          placeholder="Case Title"
          value={caseData.title}
          onChange={(e) => setCaseData({ ...caseData, title: e.target.value })}
        />
        <select
          style={styles.input}
          value={caseData.status}
          onChange={(e) => setCaseData({ ...caseData, status: e.target.value })}
        >
          <option>Active</option>
          <option>Cold</option>
          <option>Resolved</option>
        </select>
        <input
          style={styles.input}
          placeholder="Focus Role"
          value={caseData.role}
          onChange={(e) => setCaseData({ ...caseData, role: e.target.value })}
        />
        <input
          style={styles.input}
          type="date"
          value={caseData.opened}
          onChange={(e) => setCaseData({ ...caseData, opened: e.target.value })}
        />
        <input
          style={styles.input}
          placeholder="Podcast / Ref Link - Enter to add"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setCaseData({
                ...caseData,
                references: [...caseData.references, e.target.value],
              });
              e.target.value = "";
            }
          }}
        />
        <ul>
          {caseData.references.map((ref, idx) => (
            <li key={idx}>
              <a href={ref} target="_blank" rel="noopener noreferrer">
                {ref}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section style={styles.section}>
        <h2 style={styles.header}>Chronological Record</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Timestamp</th>
              <th style={styles.th}>Event</th>
              <th style={styles.th}>Source</th>
              <th style={styles.th}>Media Ref</th>
              <th style={styles.th}>Weight</th>
              <th style={styles.th}>Verification</th>
            </tr>
          </thead>
          <tbody>
            {timeline.map((item, idx) => (
              <tr key={idx}>
                <td style={styles.td}>
                  <input
                    style={styles.input}
                    type="date"
                    value={item.timestamp}
                    onChange={(e) => {
                      timeline[idx].timestamp = e.target.value;
                      setTimeline([...timeline]);
                    }}
                  />
                </td>
                <td style={styles.td}>
                  <textarea
                    style={styles.input}
                    value={item.event}
                    onChange={(e) => {
                      timeline[idx].event = e.target.value;
                      setTimeline([...timeline]);
                    }}
                  />
                </td>
                <td style={styles.td}>
                  <input
                    style={styles.input}
                    value={item.source}
                    onChange={(e) => {
                      timeline[idx].source = e.target.value;
                      setTimeline([...timeline]);
                    }}
                  />
                </td>
                <td style={styles.td}>
                  <input
                    style={styles.input}
                    value={item.mediaRef}
                    onChange={(e) => {
                      timeline[idx].mediaRef = e.target.value;
                      setTimeline([...timeline]);
                    }}
                  />
                </td>
                <td style={styles.td}>
                  <input
                    type="checkbox"
                    checked={item.weight}
                    onChange={(e) => {
                      timeline[idx].weight = e.target.checked;
                      setTimeline([...timeline]);
                    }}
                  />
                </td>
                <td style={styles.td}>
                  <select
                    style={styles.input}
                    value={item.verification}
                    onChange={(e) => {
                      timeline[idx].verification = e.target.value;
                      setTimeline([...timeline]);
                    }}
                  >
                    <option>Pending</option>
                    <option>Confirmed</option>
                    <option>Disputed</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button style={styles.button} onClick={handleAddTimeline}>
          Add Event
        </button>
      </section>

      <section style={styles.section}>
        <h2 style={styles.header}>Persons of Interest</h2>
        {persons.map((person, idx) => (
          <div
            key={idx}
            style={{
              border: "1px solid #D2B48C",
              padding: "10px",
              margin: "10px 0",
            }}
          >
            <input
              style={styles.input}
              placeholder="Name"
              value={person.name}
              onChange={(e) => {
                persons[idx].name = e.target.value;
                setPersons([...persons]);
              }}
            />
            <input
              style={styles.input}
              placeholder="Image URL"
              value={person.image}
              onChange={(e) => {
                persons[idx].image = e.target.value;
                setPersons([...persons]);
              }}
            />
            <textarea
              style={styles.input}
              placeholder="Role"
              value={person.role.join(",")}
              onChange={(e) => {
                persons[idx].role = e.target.value.split(",");
                setPersons([...persons]);
              }}
            />
            <textarea
              style={styles.input}
              placeholder="Alibi"
              value={person.alibi}
              onChange={(e) => {
                persons[idx].alibi = e.target.value;
                setPersons([...persons]);
              }}
            />
            <input
              style={styles.input}
              placeholder="Connections"
              value={person.connections}
              onChange={(e) => {
                persons[idx].connections = e.target.value;
                setPersons([...persons]);
              }}
            />
            <textarea
              style={styles.input}
              placeholder="Indicators"
              value={person.indicators.join(",")}
              onChange={(e) => {
                persons[idx].indicators = e.target.value.split(",");
                setPersons([...persons]);
              }}
            />
            <input
              style={styles.input}
              placeholder="Media Mentions URL"
              value={person.mediaMentions}
              onChange={(e) => {
                persons[idx].mediaMentions = e.target.value;
                setPersons([...persons]);
              }}
            />
            <p>
              Assessment:{" "}
              {person.indicators.length >= 4
                ? "High Concern"
                : person.indicators.length >= 2
                ? "Moderate Concern"
                : "Low Concern"}
            </p>
          </div>
        ))}
        <button style={styles.button} onClick={handleAddPerson}>
          Add Person
        </button>
      </section>

      <section style={styles.section}>
        <h2 style={styles.header}>Evidence Repository</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Description</th>
              <th style={styles.th}>Category</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Link</th>
              <th style={styles.th}>Chain Notes</th>
              <th style={styles.th}>Strength</th>
            </tr>
          </thead>
          <tbody>
            {evidence.map((item, idx) => (
              <tr key={idx}>
                <td style={styles.td}>{item.id}</td>
                <td style={styles.td}>
                  <input
                    style={styles.input}
                    value={item.description}
                    onChange={(e) => {
                      evidence[idx].description = e.target.value;
                      setEvidence([...evidence]);
                    }}
                  />
                </td>
                <td style={styles.td}>
                  <select
                    style={styles.input}
                    value={item.category}
                    onChange={(e) => {
                      evidence[idx].category = e.target.value;
                      setEvidence([...evidence]);
                    }}
                  >
                    <option>Physical</option>
                    <option>Digital</option>
                    <option>Statement</option>
                    <option>Document</option>
                    <option>Forensic</option>
                    <option>Media Clip</option>
                    <option>FOIA</option>
                  </select>
                </td>
                <td style={styles.td}>
                  <select
                    style={styles.input}
                    value={item.status}
                    onChange={(e) => {
                      evidence[idx].status = e.target.value;
                      setEvidence([...evidence]);
                    }}
                  >
                    <option>Pending</option>
                    <option>Acquired</option>
                    <option>Analyzed</option>
                    <option>Challenged</option>
                  </select>
                </td>
                <td style={styles.td}>
                  <input
                    style={styles.input}
                    value={item.link}
                    onChange={(e) => {
                      evidence[idx].link = e.target.value;
                      setEvidence([...evidence]);
                    }}
                  />
                </td>
                <td style={styles.td}>
                  <textarea
                    style={styles.input}
                    value={item.chainNotes}
                    onChange={(e) => {
                      evidence[idx].chainNotes = e.target.value;
                      setEvidence([...evidence]);
                    }}
                  />
                </td>
                <td style={styles.td}>
                  <select
                    style={styles.input}
                    value={item.strength}
                    onChange={(e) => {
                      evidence[idx].strength = e.target.value;
                      setEvidence([...evidence]);
                    }}
                  >
                    <option>Strong</option>
                    <option>Corroborative</option>
                    <option>Circumstantial</option>
                    <option>Weak</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button style={styles.button} onClick={handleAddEvidence}>
          Add Evidence
        </button>
      </section>

      <section style={styles.section}>
        <h2 style={styles.header}>Theory Development</h2>
        {theories.map((theory, idx) => (
          <div
            key={idx}
            style={{
              border: "1px solid #D2B48C",
              padding: "10px",
              margin: "10px 0",
            }}
          >
            <input
              style={styles.input}
              placeholder="Theory Title"
              value={theory.title}
              onChange={(e) => {
                theories[idx].title = e.target.value;
                setTheories([...theories]);
              }}
            />
            <textarea
              style={styles.input}
              placeholder="Core Premise"
              value={theory.premise}
              onChange={(e) => {
                theories[idx].premise = e.target.value;
                setTheories([...theories]);
              }}
            />
            <input
              style={styles.input}
              placeholder="Supporting Items"
              value={theory.supporting}
              onChange={(e) => {
                theories[idx].supporting = e.target.value;
                setTheories([...theories]);
              }}
            />
            <textarea
              style={styles.input}
              placeholder="Contradictions"
              value={theory.contradictions}
              onChange={(e) => {
                theories[idx].contradictions = e.target.value;
                setTheories([...theories]);
              }}
            />
            <input
              style={styles.input}
              type="range"
              min="0"
              max="100"
              value={theory.probability}
              onChange={(e) => {
                theories[idx].probability = e.target.value;
                setTheories([...theories]);
              }}
            />{" "}
            <span>{theory.probability}%</span>
            <input
              style={styles.input}
              placeholder="Origin URL"
              value={theory.origin}
              onChange={(e) => {
                theories[idx].origin = e.target.value;
                setTheories([...theories]);
              }}
            />
            <textarea
              style={styles.input}
              placeholder="Notes"
              value={theory.notes}
              onChange={(e) => {
                theories[idx].notes = e.target.value;
                setTheories([...theories]);
              }}
            />
          </div>
        ))}
        <button style={styles.button} onClick={handleAddTheory}>
          Add Theory
        </button>
      </section>

      <section style={styles.section}>
        <h2 style={styles.header}>Media & Episode Log</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Title</th>
              <th style={styles.th}>Platform Link</th>
              <th style={styles.th}>Timestamps</th>
              <th style={styles.th}>Takeaways</th>
              <th style={styles.th}>Rating</th>
              <th style={styles.th}>Linked To</th>
            </tr>
          </thead>
          <tbody>
            {media.map((item, idx) => (
              <tr key={idx}>
                <td style={styles.td}>
                  <input
                    style={styles.input}
                    value={item.title}
                    onChange={(e) => {
                      media[idx].title = e.target.value;
                      setMedia([...media]);
                    }}
                  />
                </td>
                <td style={styles.td}>
                  <input
                    style={styles.input}
                    value={item.platform}
                    onChange={(e) => {
                      media[idx].platform = e.target.value;
                      setMedia([...media]);
                    }}
                  />
                </td>
                <td style={styles.td}>
                  <textarea
                    style={styles.input}
                    value={item.timestamps}
                    onChange={(e) => {
                      media[idx].timestamps = e.target.value;
                      setMedia([...media]);
                    }}
                  />
                </td>
                <td style={styles.td}>
                  <textarea
                    style={styles.input}
                    value={item.takeaways}
                    onChange={(e) => {
                      media[idx].takeaways = e.target.value;
                      setMedia([...media]);
                    }}
                  />
                </td>
                <td style={styles.td}>
                  <select
                    style={styles.input}
                    value={item.rating}
                    onChange={(e) => {
                      media[idx].rating = e.target.value;
                      setMedia([...media]);
                    }}
                  >
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </td>
                <td style={styles.td}>
                  <input
                    style={styles.input}
                    value={item.linkedTo}
                    onChange={(e) => {
                      media[idx].linkedTo = e.target.value;
                      setMedia([...media]);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button style={styles.button} onClick={handleAddMedia}>
          Add Media
        </button>
      </section>

      <button
        style={styles.button}
        onClick={() =>
          alert(
            "Export functionality - Print this page or use browser save as PDF"
          )
        }
      >
        Export to PDF
      </button>
      <button
        style={styles.button}
        onClick={() =>
          navigator.clipboard.writeText("Share this page URL or screenshot")
        }
      >
        Share Snapshot
      </button>
    </div>
  );
};

export default SleuthMasterPro;
