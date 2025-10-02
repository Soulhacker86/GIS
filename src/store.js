const STORAGE_KEY = "neom_pm_workspace_v1";

const defaultState = {
  settings: {
    disciplines: [
      "Architecture",
      "Structure",
      "MEP",
      "Infrastructure",
      "Landscape",
      "QS",
      "HSE"
    ],
    lupSectors: [
      "Urban Planning",
      "Environment",
      "Energy",
      "Water",
      "ETSD",
      "Projects",
      "Operations",
      "OXAGON",
      "Government Affairs",
      "Land Mobility",
      "Heritage",
      "Air Mobility",
      "Nature Region",
      "Tanmiah (External)",
      "NEOM Authority DPMA",
      "Tourism",
      "THE LINE",
      "Tech & Digital"
    ]
  },
  portfolio: [
    {
      id: "P-001",
      name: "Logistics Hub",
      lat: 27.5,
      lon: 36.5,
      stage: "Stage 2",
      manager: "Shakil",
      status: "Design",
      progress: 42
    },
    {
      id: "P-002",
      name: "Resort Cluster",
      lat: 27.63,
      lon: 36.64,
      stage: "Stage 3",
      manager: "Aisha",
      status: "Construction",
      progress: 71
    }
  ],
  stages: {},
  lup: {},
  bim: {},
  qms: {},
  tasks: [
    {
      id: "T-001",
      projectId: "P-001",
      title: "Issue PRC-029 stage pack",
      discipline: "Architecture",
      due: "2024-05-15",
      status: "In Progress"
    },
    {
      id: "T-002",
      projectId: "P-002",
      title: "Upload PRC-009 FRM02 review",
      discipline: "MEP",
      due: "2024-05-18",
      status: "Open"
    }
  ],
  risks: [
    {
      id: "R-001",
      projectId: "P-002",
      title: "Utility corridor approvals",
      exposure: 60
    },
    {
      id: "R-002",
      projectId: "P-001",
      title: "Supply chain delay",
      exposure: 45
    }
  ]
};

let state = load();
const subscribers = new Set();

function load() {
  if (typeof window === "undefined") {
    return structuredClone(defaultState);
  }
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return structuredClone(defaultState);
    }
    const parsed = JSON.parse(stored);
    return {
      ...structuredClone(defaultState),
      ...parsed,
      settings: {
        ...structuredClone(defaultState.settings),
        ...(parsed.settings ?? {})
      }
    };
  } catch (error) {
    console.warn("Failed to load state, using defaults", error);
    return structuredClone(defaultState);
  }
}

function persist() {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function notify() {
  subscribers.forEach((fn) => fn(state));
}

export function useStore() {
  return {
    get: () => state,
    set: (next) => {
      state = next;
      persist();
      notify();
    },
    patch: (fn) => {
      const draft = structuredClone(state);
      fn(draft);
      state = draft;
      persist();
      notify();
    },
    subscribe: (fn) => {
      subscribers.add(fn);
      return () => subscribers.delete(fn);
    },
    reset: () => {
      state = structuredClone(defaultState);
      persist();
      notify();
    },
    export: () => JSON.stringify(state, null, 2),
    import: (json) => {
      state = JSON.parse(json);
      persist();
      notify();
    }
  };
}
