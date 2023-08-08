using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TravelAgent.Migrations
{
    /// <inheritdoc />
    public partial class init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Admins",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Admins", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TravelAgents",
                columns: table => new
                {
                    travelAgentId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    travelAgentName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    travelAgentPassword = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    travelAgentEmail = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    travelAgentPhone = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    travelAgentLocation = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    travelAgentGst = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    travelAgentPan = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    travelAgentStatus = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AgenttravelAgentId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TravelAgents", x => x.travelAgentId);
                    table.ForeignKey(
                        name: "FK_TravelAgents_TravelAgents_AgenttravelAgentId",
                        column: x => x.AgenttravelAgentId,
                        principalTable: "TravelAgents",
                        principalColumn: "travelAgentId");
                });

            migrationBuilder.CreateTable(
                name: "Places",
                columns: table => new
                {
                    placeId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    placeName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    placeImage = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    placeDescription = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    latitude = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    longitude = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    route = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    totalDays = table.Column<int>(type: "int", nullable: true),
                    spots = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    dayCost = table.Column<int>(type: "int", nullable: true),
                    tourCost = table.Column<int>(type: "int", nullable: true),
                    maxDistance = table.Column<int>(type: "int", nullable: true),
                    AgenttravelAgentId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Places", x => x.placeId);
                    table.ForeignKey(
                        name: "FK_Places_TravelAgents_AgenttravelAgentId",
                        column: x => x.AgenttravelAgentId,
                        principalTable: "TravelAgents",
                        principalColumn: "travelAgentId");
                });

            migrationBuilder.CreateTable(
                name: "Hotels",
                columns: table => new
                {
                    hotelId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    hotelName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    hotelLocation = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    hotelSubLocation = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    hotelPincode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    hotelImage = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    hotelContact = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    placeId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Hotels", x => x.hotelId);
                    table.ForeignKey(
                        name: "FK_Hotels_Places_placeId",
                        column: x => x.placeId,
                        principalTable: "Places",
                        principalColumn: "placeId");
                });

            migrationBuilder.CreateTable(
                name: "Restaurants",
                columns: table => new
                {
                    RestaurantId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    restaurantName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    restaurantLocation = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    restaurantSubLocation = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    restaurantPincode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    restaurantImage = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    restaurantContact = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    placeId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Restaurants", x => x.RestaurantId);
                    table.ForeignKey(
                        name: "FK_Restaurants_Places_placeId",
                        column: x => x.placeId,
                        principalTable: "Places",
                        principalColumn: "placeId");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Hotels_placeId",
                table: "Hotels",
                column: "placeId");

            migrationBuilder.CreateIndex(
                name: "IX_Places_AgenttravelAgentId",
                table: "Places",
                column: "AgenttravelAgentId");

            migrationBuilder.CreateIndex(
                name: "IX_Restaurants_placeId",
                table: "Restaurants",
                column: "placeId");

            migrationBuilder.CreateIndex(
                name: "IX_TravelAgents_AgenttravelAgentId",
                table: "TravelAgents",
                column: "AgenttravelAgentId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Admins");

            migrationBuilder.DropTable(
                name: "Hotels");

            migrationBuilder.DropTable(
                name: "Restaurants");

            migrationBuilder.DropTable(
                name: "Places");

            migrationBuilder.DropTable(
                name: "TravelAgents");
        }
    }
}
