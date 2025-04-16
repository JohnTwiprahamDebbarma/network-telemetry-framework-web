import os
import random

# Function to generate a placeholder HTML graph file
def create_placeholder_graph(file_path, title, metric_type="line"):
    """
    Creates a placeholder HTML file containing an SVG graph visualization
    
    Args:
        file_path: Full path where the file should be created
        title: Title for the graph
        metric_type: Type of visualization (line, bar, etc.)
    """
    # Create directory if it doesn't exist
    os.makedirs(os.path.dirname(file_path), exist_ok=True)
    
    # Generate some random data points for the visualization
    data_points = 10
    values = [random.randint(50, 140) for _ in range(data_points)]
    
    # Choose colors based on the title
    if "error" in title.lower():
        line_color = "#e74c3c"  # red for errors
    elif "rx" in title.lower():
        line_color = "#3498db"  # blue for receiving
    elif "tx" in title.lower():
        line_color = "#2ecc71"  # green for transmitting
    else:
        line_color = "#9b59b6"  # purple for other metrics
    
    # Create the SVG path data
    if metric_type == "line":
        # Create points for a line graph
        point_distance = 300 / (data_points - 1)
        path_data = f"M50,{150-values[0]}"
        
        for i in range(1, data_points):
            x = 50 + i * point_distance
            y = 150 - values[i]
            path_data += f" L{x},{y}"
    
    elif metric_type == "bar":
        # Create a bar chart representation
        bar_width = 250 / data_points
        bars = []
        for i in range(data_points):
            x = 50 + i * (bar_width + 5)
            height = values[i]
            y = 150 - height
            bars.append(f'<rect x="{x}" y="{y}" width="{bar_width}" height="{height}" fill="{line_color}" opacity="0.7" />')
        
        bar_elements = "\n".join(bars)
    
    # Create the HTML content
    if metric_type == "line":
        svg_content = f"""
        <svg width="400" height="200" viewBox="0 0 400 200">
            <!-- Grid lines -->
            <line x1="50" y1="150" x2="350" y2="150" stroke="#ccc" stroke-width="1" />
            <line x1="50" y1="50" x2="50" y2="150" stroke="#ccc" stroke-width="1" />
            
            <!-- Data line -->
            <path d="{path_data}" fill="none" stroke="{line_color}" stroke-width="2" />
            
            <!-- Data points -->
            {"".join([f'<circle cx="{50 + i * point_distance}" cy="{150-values[i]}" r="3" fill="{line_color}" />' for i in range(data_points)])}
            
            <!-- X and Y axis labels -->
            <text x="200" y="180" text-anchor="middle" fill="#777">Time</text>
            <text x="30" y="100" text-anchor="middle" fill="#777" transform="rotate(-90, 30, 100)">Value</text>
            
            <!-- Title -->
            <text x="200" y="30" text-anchor="middle" fill="#333" font-weight="bold">
                {title}
            </text>
        </svg>
        """
    else:
        svg_content = f"""
        <svg width="400" height="200" viewBox="0 0 400 200">
            <!-- Grid lines -->
            <line x1="50" y1="150" x2="350" y2="150" stroke="#ccc" stroke-width="1" />
            <line x1="50" y1="50" x2="50" y2="150" stroke="#ccc" stroke-width="1" />
            
            <!-- Bars -->
            {bar_elements}
            
            <!-- X and Y axis labels -->
            <text x="200" y="180" text-anchor="middle" fill="#777">Time</text>
            <text x="30" y="100" text-anchor="middle" fill="#777" transform="rotate(-90, 30, 100)">Value</text>
            
            <!-- Title -->
            <text x="200" y="30" text-anchor="middle" fill="#333" font-weight="bold">
                {title}
            </text>
        </svg>
        """
    
    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <title>Graph: {title}</title>
        <style>
            body {{
                font-family: Arial, sans-serif;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
                background-color: #f8f9fa;
                color: #333;
            }}
            .graph-container {{
                text-align: center;
                padding: 20px;
                background-color: white;
                border-radius: 10px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                max-width: 90%;
                margin: 0 auto;
            }}
            .graph-container svg {{
                max-width: 100%;
                height: auto;
            }}
            p {{
                color: #777;
            }}
            @media (prefers-color-scheme: dark) {{
                body {{
                    background-color: #121212;
                    color: #e0e0e0;
                }}
                .graph-container {{
                    background-color: #1e1e1e;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
                }}
                svg text {{
                    fill: #e0e0e0 !important;
                }}
                svg line {{
                    stroke: #444 !important;
                }}
            }}
        </style>
    </head>
    <body>
        <div class="graph-container">
            {svg_content}
            <p>Sample visualization - actual data is being processed</p>
        </div>
    </body>
    </html>
    """
    
    # Write the HTML file
    with open(file_path, 'w') as f:
        f.write(html_content)

# Example usage
if __name__ == "__main__":
    # Setup paths
    base_dir = os.path.dirname(os.path.abspath(__file__))
    static_dir = os.path.join(base_dir, 'static')
    graphs_dir = os.path.join(static_dir, 'graphs')
    
    # Ensure the graphs directory exists
    os.makedirs(graphs_dir, exist_ok=True)
    
    # Define cluster prefixes
    clusters = {
        1: "1e/97",
        2: "2e/bc",
        3: "3e/ad"
    }
    
    # Define graph types
    graph_types = {
        'Total_Rx_Packets': 'bar',
        'Average_Rx_Packets': 'line',
        'Min_Rx_Packets': 'line',
        'Max_Rx_Packets': 'line',
        'Total_Tx_Packets': 'bar',
        'Average_Tx_Packets': 'line',
        'Min_Tx_Packets': 'line',
        'Max_Tx_Packets': 'line',
        'Average_Rx_Bytes': 'line',
        'Average_Tx_Bytes': 'line',
        'Average_Rx_Errors': 'line',
        'Average_Tx_Errors': 'line',
        'Rx_Utilization': 'line',
        'Tx_Utilization': 'line',
        'Buffer_Occupancy': 'line',
        'Throughput_(Mbps)': 'line',
        'Total_Bytes': 'bar',
        'Total_Errors': 'bar',
        'Total_Packets': 'bar',
        'Latest_Timestamp': 'line',
        'Number_of_Ports': 'bar'
    }
    
    # Create placeholder graphs for each cluster
    for cluster_id, prefix in clusters.items():
        full_path = f"{prefix}/ec/b3/cc/5f"
        
        for graph_name, graph_type in graph_types.items():
            file_path = os.path.join(graphs_dir, f"network_stats_{full_path}_{graph_name}.html")
            create_placeholder_graph(file_path, graph_name.replace('_', ' '), graph_type)
            
        print(f"Created placeholder graphs for Cluster {cluster_id}")
    
    print("All placeholder graphs created successfully!")
    