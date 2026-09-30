import sys
import json
from pydriller import Repository

def calculate_code_churn(repo_path, max_commits=10):
    churn_data = {
        "total_commits_analyzed": 0,
        "files_modified": {},
        "total_lines_added": 0,
        "total_lines_deleted": 0,
        "churn_score": 0
    }

    try:
        for commit in Repository(repo_path, order='reverse').traverse_commits():
            churn_data["total_commits_analyzed"] += 1
            for modified_file in commit.modified_files:
                fname = modified_file.filename
                if fname not in churn_data["files_modified"]:
                    churn_data["files_modified"][fname] = {
                        "modifications_count": 0,
                        "added": 0,
                        "deleted": 0
                    }
                churn_data["files_modified"][fname]["modifications_count"] += 1
                churn_data["files_modified"][fname]["added"] += modified_file.added_lines
                churn_data["files_modified"][fname]["deleted"] += modified_file.deleted_lines
                churn_data["total_lines_added"] += modified_file.added_lines
                churn_data["total_lines_deleted"] += modified_file.deleted_lines

            if churn_data["total_commits_analyzed"] >= max_commits:
                break
    except Exception as e:
        churn_data["error"] = str(e)

    # Churn Score = added + deleted lines across monitored commits
    churn_data["churn_score"] = churn_data["total_lines_added"] + churn_data["total_lines_deleted"]
    return churn_data

if __name__ == '__main__':
    target = sys.argv[1] if len(sys.argv) > 1 else "."
    result = calculate_code_churn(target)
    print(json.dumps(result, indent=2))
