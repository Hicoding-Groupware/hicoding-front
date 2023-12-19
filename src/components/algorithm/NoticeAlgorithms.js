// stackDFS
export function stackDFS(root) {
    const result = []; // 결과를 저장할 리스트

    const stack = [{object: root}];

    while (stack.length > 0) {
        const {object} = stack.pop();
        result.push(object); // 객체를 리스트에 추가

        // 자식 댓글들을 역순으로 스택에 추가
        stack.push(...(object.childrenList || []).map((child) => ({object: child})).reverse());
    }

    return result; // 최종 결과 반환
}

// 위상 정렬
export function topologicalSort(graph) {
    const result = [];
    const inDegree = new Map();

    // 초기 inDegree 계산
    for (const node in graph) {
        inDegree[node] = 0;
    }

    // 선행 관계에 따라 inDegree 증가
    for (const node in graph) {
        for (const neighbor of graph[node]) {
            inDegree[neighbor]++;
        }
    }

    // inDegree가 0인 노드를 큐에 추가
    const queue = [];
    for (const node in inDegree) {
        if (inDegree[node] === 0) {
            queue.push(node);
        }
    }

    // 위상 정렬 수행
    while (queue.length > 0) {
        const current = queue.shift();
        result.push(current);

        for (const neighbor of graph[current]) {
            inDegree[neighbor]--;

            if (inDegree[neighbor] === 0) {
                queue.push(neighbor);
            }
        }
    }

    // 사이클이 없으면 결과 반환, 있으면 null 반환
    return result.length === Object.keys(graph).length ? result : null;
}