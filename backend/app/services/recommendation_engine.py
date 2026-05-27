from typing import List, Dict, Any, Tuple
from app.services.symptom_analyzer import SYMPTOM_DISEASE_MAP

URGENT_SYMPTOMS = {
    "chest pain": {"severity": "Severe", "recommendation": "EMERGENCY: Seek immediate medical attention. Call emergency services.", "specialist": "Emergency Medicine"},
    "difficulty breathing": {"severity": "Severe", "recommendation": "EMERGENCY: Seek immediate medical attention. Call emergency services.", "specialist": "Emergency Medicine"},
    "unconsciousness": {"severity": "Severe", "recommendation": "EMERGENCY: Call emergency services immediately.", "specialist": "Emergency Medicine"},
    "severe bleeding": {"severity": "Severe", "recommendation": "EMERGENCY: Apply pressure and call emergency services.", "specialist": "Emergency Medicine"},
    "seizure": {"severity": "Severe", "recommendation": "EMERGENCY: Seek immediate medical attention. Call emergency services.", "specialist": "Neurologist"},
    "paralysis": {"severity": "Severe", "recommendation": "EMERGENCY: Seek immediate medical attention. Possible stroke.", "specialist": "Neurologist"},
}


def analyze_symptoms(symptoms: List[str]) -> Dict[str, Any]:
    normalized = [s.strip().lower() for s in symptoms]

    for urgent_symptom, info in URGENT_SYMPTOMS.items():
        if any(urgent_symptom in s for s in normalized):
            return {
                "disease": "Emergency Condition Detected",
                "severity": info["severity"],
                "recommendation": info["recommendation"],
                "specialist": info["specialist"],
            }

    best_match = None
    best_score = 0

    for entry in SYMPTOM_DISEASE_MAP:
        score = sum(1 for keyword in entry["keywords"] if any(keyword in s for s in normalized))
        if score > best_score:
            best_score = score
            best_match = entry

    if best_match and best_score > 0:
        return {
            "disease": best_match["disease"],
            "severity": best_match["severity"],
            "recommendation": best_match["recommendation"],
            "specialist": best_match["specialist"],
        }

    return {
        "disease": "Unknown / Not Recognized",
        "severity": "Uncertain",
        "recommendation": "We could not identify a condition based on the symptoms provided. Please consult a healthcare professional for an accurate diagnosis.",
        "specialist": "General Physician",
    }
